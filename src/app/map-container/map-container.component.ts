import { AfterViewInit, Component } from '@angular/core';
import { Loader } from 'google-maps';
import html2canvas, { Options } from 'html2canvas';
import { BehaviorSubject, debounceTime, delay, distinct, distinctUntilChanged } from "rxjs";
import { LayerStyles } from './models/layer-styles';
import { Config } from 'src/Config';
import { color } from 'html2canvas/dist/types/css/types/color';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements AfterViewInit {
  private readonly apiKey = Config.API_KEY;
  private loader = new Loader(this.apiKey);

  mapDetails: MapDetailsType = {
    latitude: 40.70782099171142,
    longitude: -74.01146343775363,
    zoom: 13,
  };
  lastChange?: string;
  $mapDetails = new BehaviorSubject<MapDetailsType>(this.mapDetails);

  loading = true;
  hotReload = true;
  invert = false;

  readonly layerDetails: LayerDetailsType[] = [
    {
      divId: "roadMap",
      checkId: "roadMapVisible",
      outputId: "roadMapOutput",
      colorId: "roadMapColor",
      name: "Road Map",
      colorHex: "#000000",
      visible: true,
      styles: LayerStyles.roadsLayerStyle,
      stackOrder: 1
    },
    {
      divId: "waterMap",
      checkId: "waterMapVisible",
      outputId: "waterMapOutput",
      colorId: "waterMapColor",
      name: "Water Map",
      colorHex: "#0000ff",
      visible: true,
      styles: LayerStyles.waterLayerStyle,
      stackOrder: 0
    }
  ];

  get getStackedLayers(): LayerDetailsType[] {
    return this.layerDetails.sort((a, b) => a.stackOrder - b.stackOrder)
  }

  mapObjects: Map<string, google.maps.Map<HTMLElement>> = new Map<string, google.maps.Map<HTMLElement>>();

  ngAfterViewInit(): void {
    this.loadMaps();
    this.$mapDetails
      .pipe(debounceTime(250))
      .subscribe(x => {
        if (this.hotReload) this.loading = true;
        this.resetMap(x);
        if (this.hotReload) {
          setTimeout(() => this.capture().then(() => this.loading = false), 500);
        }
      });
  }

  async loadMaps(exclude: string | undefined = undefined) {
    this.loading = true;

    const promises = this.layerDetails
      .filter(details => details.divId !== exclude)
      .map(details => this.loadMap(details.divId).then(mapObj => {
        if (!!mapObj) {
          this.mapObjects.set(details.divId, mapObj);
        }
      }));

    await Promise.all(promises);
    setTimeout(() => this.capture().then(x => this.loading = false), 1000);
  }

  resetMap(details: MapDetailsType, ignoreLastChanged: boolean = false) {
    [...this.mapObjects]
      .filter(x => ignoreLastChanged || x[0] !== this.lastChange)
      .map(x => x[1])
      .forEach(map => {
        map.setCenter({ lat: details.latitude, lng: details.longitude });
        map.setZoom(details.zoom);
      });
  }

  async loadMap(mapDivId: string) {
    let mapDiv = document.getElementById(mapDivId);
    if (!mapDiv) return;

    const google = await this.loader.load();
    const styles = this.layerDetails.find(x => x.divId === mapDivId)?.styles;
    const options: google.maps.MapOptions = {
      center: { lat: this.mapDetails.latitude, lng: this.mapDetails.longitude },
      zoom: this.mapDetails.zoom,

      fullscreenControl: false,
      panControl: false,
      scaleControl: false,
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      keyboardShortcuts: false,
      draggable: true,
      backgroundColor: "#ffffff",

      styles: styles
    };

    const map = new google.maps.Map(mapDiv, options);
    map.changed = (x) => {
      const latitude = map.getCenter().lat();
      const longitude = map.getCenter().lng();
      const zoom = map.getZoom();

      if (x === "center" && (latitude !== this.mapDetails.latitude || longitude !== this.mapDetails.longitude)) {
        this.mapDetails.latitude = latitude;
        this.mapDetails.longitude = longitude;
      } else if (x === "zoom" && zoom !== this.mapDetails.zoom) {
        this.mapDetails.zoom = zoom;
      } else {
        return;
      }

      this.lastChange = mapDivId;
      this.$mapDetails.next(this.mapDetails);
    };
    return map;
  }

  async renderCapture() {
    this.loading = true;
    setTimeout(() => {
      this.capture().then(() =>
        this.loading = false
      );
    }, 100);
  }

  private async capture() {
    const html2canvasOptions = {
      allowTaint: true,
      useCORS: true,
      height: 500,
      width: 500,
      scale: 1
    } as Options;

    const promises = this.layerDetails.map(async details => {
      const outputCanvas = document.getElementById(details.outputId) as HTMLCanvasElement;
      const snapshotCanvas = await html2canvas(document.getElementById(details.divId) as HTMLElement, html2canvasOptions);
      return this.postProcess(details, outputCanvas, snapshotCanvas);
    });

    await Promise.all(promises);
  }

  postProcess(details: LayerDetailsType, outputCanvas: HTMLCanvasElement, canvas: HTMLCanvasElement) {
    let outputContext = outputCanvas.getContext('2d');
    if (!outputContext) return;

    let context = canvas.getContext('2d');
    if (!context) return;


    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      // if pixel is white, make it transparent
      if (red === 255 && green === 255 && blue === 255) {
        data[i + 3] = 0;
      } else if (!!details.colorHex) {
        const rgb = this.hexToRgb(details.colorHex);
        if (!rgb?.length) throw new Error("Invalid color");

        const avg = (red + green + blue) / 3;
        const intensity = (255 - avg) / 255;
        data[i] = rgb[0] * intensity;
        data[i + 1] = rgb[1] * intensity;
        data[i + 2] = rgb[2] * intensity;
        data[i + 3] = 255 * intensity;
      }

      if (this.invert) {
        data[i] = 255 - red;
        data[i + 1] = 255 - green;
        data[i + 2] = 255 - blue;
      }
    }

    outputContext.putImageData(imageData, 0, 0);
  }

  // adapted from https://stackoverflow.com/a/39077686
  hexToRgb(hex: string) {
    var match = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1)
      .match(/.{2}/g);

    return match?.map(x => parseInt(x, 16))

  }
}


type MapDetailsType = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type LayerDetailsType = {
  name: string;
  divId: string;
  visible: boolean;
  colorHex?: string;
  styles: google.maps.MapTypeStyle[];
  stackOrder: number;

  checkId: string;
  outputId: string;
  colorId: string;
}