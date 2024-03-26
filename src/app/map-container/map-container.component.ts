import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Loader } from 'google-maps';
import html2canvas, { Options } from 'html2canvas';
import { BehaviorSubject, debounceTime, filter } from "rxjs";
import { LayerStyles } from './models/layer-styles';
import { Config } from 'src/Config';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit, AfterViewInit {
  private readonly apiKey = Config.API_KEY;
  private loader = new Loader(this.apiKey);

  mapDetails: MapDetailsType = {
    latitude: 40.70782099171142,
    longitude: -74.01146343775363,
    zoom: 13,
  };
  $mapDetails = new BehaviorSubject<MapDetailsType>(this.mapDetails);

  loading = true;
  hotReload = false;
  invert = false;

  readonly layerDetails: LayerDetails[] = [
    new LayerDetails("Water Map", "waterMap", LayerStyles.waterLayerStyle, "#00009e", 0),
    new LayerDetails("Parks Map", "parksMap", LayerStyles.parksLayerStyle, "#00ff00", 1, 0.5),
    new LayerDetails("Road Map", "roadMap", LayerStyles.roadsLayerStyle, "#000000", 2),
  ];

  get getStackedLayers(): LayerDetails[] {
    return this.layerDetails.sort((a, b) => a.stackOrder - b.stackOrder)
  }

  private mapObjects: Map<string, google.maps.Map<HTMLElement>> = new Map<string, google.maps.Map<HTMLElement>>();
  private targetMap: google.maps.Map<HTMLElement> | undefined;

  ngOnInit(): void {
    this.loadDefaults();
    this.loadCachePayload();
  }

  ngAfterViewInit(): void {
    this.loadMaps();
    this.$mapDetails
      .pipe(debounceTime(250), filter(() => !this.loading))
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

    const promises: Promise<any>[] = this.layerDetails
      .filter(details => details.divId !== exclude)
      .map(details => this.loadMap(details.divId).then(mapObj => {
        if (!!mapObj) {
          this.mapObjects.set(details.divId, mapObj);
        }
      }));

    promises.push(this.loadMap("targetMap").then(x => this.targetMap = x));

    await Promise.all(promises);
    setTimeout(() => this.capture().then(() => this.loading = false), 1000);
  }

  resetMap(details: MapDetailsType, refreshTargetMap: boolean = false) {
    if (!this.targetMap) return;

    const mapsToUpdate = [...this.mapObjects].map(map => map[1]);
    if (refreshTargetMap)
      mapsToUpdate.push(this.targetMap);

    mapsToUpdate.forEach(map => {
      map.setCenter({ lat: details.latitude, lng: details.longitude });
      map.setZoom(details.zoom);
    });

    if (refreshTargetMap)
      this.$mapDetails.next(details);

    this.storeCachePayload();
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
    this.storeCachePayload();
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

  private postProcess(details: LayerDetails, outputCanvas: HTMLCanvasElement, canvas: HTMLCanvasElement) {
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

      if (red === 255 && green === 255 && blue === 255) { // if pixel is white, make it transparent
        data[i + 3] = 0;
      } else if (!!details.colorHex) { // Apply color mask to layer.
        const rgb = this.hexToRgb(details.colorHex);
        if (!rgb?.length) throw new Error("Invalid color");

        const avg = (red + green + blue) / 3;
        const intensity = (255 - avg) / 255;
        data[i] = rgb[0] * intensity;
        data[i + 1] = rgb[1] * intensity;
        data[i + 2] = rgb[2] * intensity;
        data[i + 3] = 255 * intensity;
      }
    }

    outputContext.putImageData(imageData, 0, 0);
  }

  // adapted from https://stackoverflow.com/a/39077686
  private hexToRgb(hex: string) {
    var match = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1)
      .match(/.{2}/g);

    return match?.map(x => parseInt(x, 16))

  }

  private loadCachePayload() {
    const cache = localStorage.getItem("mapDetails");
    if (!cache) return;

    const details = JSON.parse(cache) as CachePayload;

    this.mapDetails = details.mapDetails;
    this.invert = details.invert;
    this.hotReload = details.hotReload;
    this.layerDetails.forEach(layer => {
      const cacheLayer = details.layerDetails.find(x => x.name === layer.name);
      if (!cacheLayer) return;

      layer.visible = cacheLayer.visible;
      layer.colorHex = cacheLayer.colorHex;
    });
  }

  public storeCachePayload() {
    const cache: CachePayload = {
      mapDetails: this.mapDetails,
      invert: this.invert,
      hotReload: this.hotReload,
      layerDetails: this.layerDetails.map(x => {
        return {
          name: x.name,
          visible: x.visible,
          colorHex: x.colorHex,
        }
      })
    };

    localStorage.setItem("mapDetails", JSON.stringify(cache));
  }

  public loadDefaults(saveCache: boolean = false) {
    this.mapDetails = {
      latitude: 40.70782099171142,
      longitude: -74.01146343775363,
      zoom: 13,
    };
    this.invert = false;
    this.hotReload = false;
    this.layerDetails.forEach(layer => {
      layer.visible = true;
      layer.colorHex = layer.defaultColorHex;
    });

    if (saveCache) {
      localStorage.removeItem("mapDetails");
      this.loadMaps();
    }

  }

}

type MapDetailsType = {
  latitude: number;
  longitude: number;
  zoom: number;
}

class LayerDetails implements ILayerDetails {
  constructor(
    public name: string,
    public divId: string,
    public styles?: google.maps.MapTypeStyle[] | undefined,
    public defaultColorHex: string = "#000000",
    public stackOrder: number = 0,
    public opacity?: number
  ) {
    this.checkId = name + "Visible";
    this.outputId = name + "Output";
    this.colorId = name + "Color";
    this.colorHex = defaultColorHex;
  }
  visible: boolean = true;
  colorHex: string = "#000000";

  checkId: string;
  outputId: string;
  colorId: string;
}

interface ILayerDetails {
  name: string,
  visible: boolean,
  colorHex: string,
}

type CachePayload = {
  mapDetails: MapDetailsType;
  layerDetails: ILayerDetails[];
  invert: boolean;
  hotReload: boolean;
}