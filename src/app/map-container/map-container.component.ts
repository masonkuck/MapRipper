import { AfterViewInit, Component } from '@angular/core';
import { Loader } from 'google-maps';
import html2canvas from 'html2canvas';
import { BehaviorSubject, debounceTime, delay, of } from "rxjs";
import * as $ from 'jquery';
import { LayerStyles } from './models/layer-styles';
import { Config } from 'src/Config';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements AfterViewInit {
  private readonly apiKey = Config.API_KEY;

  loading = true;

  // Form values
  mapDetails: MapDetailsType = {
    latitude: 42.76408410998234,
    longitude: -86.110772,
    zoom: 13
  };
  $mapDetails = new BehaviorSubject<MapDetailsType>(this.mapDetails);

  roadMapVisible = true;
  waterMapVisible = true;

  readonly maps = new Map<string, string>();
  readonly roadMapId = "roadMap";
  readonly waterMapId = "waterMap";

  loader = new Loader(this.apiKey);

  constructor() {
    this.maps.set("roadMap", "e0de745d56a5a829");
    this.maps.set("waterMap", "b3ab923cefc5f068");
  }

  ngAfterViewInit(): void {
    this.loadMaps();
    this.$mapDetails.pipe(debounceTime(500), delay(500)).subscribe(x => {
      console.log("Details changed", x);
      this.loadMaps(x.lastChange);
    });
  }

  async loadMaps(exclude: string | undefined = undefined) {
    this.loading = true;
    const promises = [... this.maps].filter(x => x[0] !== exclude).map(x => this.loadMap(x[0], x[1]));
    await Promise.all(promises);
    setTimeout(() => this.capture().then(x => this.loading = false), 1000);
  }

  moveMap(direction: 'left' | 'right' | 'up' | 'down') {
    switch (direction) {
      case 'left':
        this.mapDetails.longitude -= 0.01;
        this.mapDetails.longitude = + this.mapDetails.longitude.toFixed(6)
        break;
      case 'right':
        this.mapDetails.longitude += 0.01;
        this.mapDetails.longitude = + this.mapDetails.longitude.toFixed(6)
        break;
      case 'up':
        this.mapDetails.latitude += 0.01;
        this.mapDetails.latitude = + this.mapDetails.latitude.toFixed(6)
        break;
      case 'down':
        this.mapDetails.latitude -= 0.01;
        this.mapDetails.latitude = + this.mapDetails.latitude.toFixed(6)
        break;
    }
    this.mapDetails.lastChange = undefined;
    this.$mapDetails.next(this.mapDetails);
  }

  async loadMap(mapDivId: string, mapId: string) {
    let mapDiv = document.getElementById(mapDivId);
    if (!mapDiv) return;

    const google = await this.loader.load();
    let styles;
    if (mapDivId.includes("road")) styles = LayerStyles.roadsLayerStyle;
    else if (mapDivId.includes("water")) styles = LayerStyles.waterLayerStyle;
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
      if (x === "center") {
        this.mapDetails.longitude = map.getCenter().lng();
        this.mapDetails.latitude = map.getCenter().lat();
      } else if (x === "zoom") {
        this.mapDetails.zoom = map.getZoom();
      } else {
        return;
      }

      this.mapDetails.lastChange = mapDivId;
      this.$mapDetails.next(this.mapDetails);
    };
    return map;
  }

  async sanitizeMap(mapDivId: string) {
    $(`#${mapDivId}>div>.gm-style>div>div>a`).remove();
    $(`#${mapDivId}>div>.gm-style>div:last`).remove();
  }

  async capture() {
    const output = document.getElementById('captureOutput') as HTMLCanvasElement;
    const output2 = document.getElementById('captureOutput2') as HTMLCanvasElement;

    this.sanitizeMap("roadMap");
    this.sanitizeMap("waterMap");

    const roadMapPromise = html2canvas(document.getElementById('roadMap') as HTMLElement, { allowTaint: true, useCORS: true }).then(x => this.postProcess(output, x))
    const waterMapPromise = html2canvas(document.getElementById('waterMap') as HTMLElement, { allowTaint: true, useCORS: true }).then(x => this.postProcess(output2, x));
    await Promise.all([roadMapPromise, waterMapPromise]);
  }

  postProcess(outputCanvas: HTMLCanvasElement, canvas: HTMLCanvasElement) {
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
      }
    }

    outputContext.putImageData(imageData, 0, 0);
  }
}

export type MapDetailsType = {
  latitude: number;
  longitude: number;
  zoom: number;
  lastChange?: string;
}
