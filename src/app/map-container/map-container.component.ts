import { AfterViewInit, Component } from '@angular/core';
import { Loader } from 'google-maps';
import html2canvas from 'html2canvas';
import { BehaviorSubject, debounceTime, delay, distinct, distinctUntilChanged } from "rxjs";
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
  private loader = new Loader(this.apiKey);
  
  mapDetails: MapDetailsType = {
    latitude: 40.70782099171142,
    longitude: -74.01146343775363,
    zoom: 13
  };
  lastChange?: string;
  $mapDetails = new BehaviorSubject<MapDetailsType>(this.mapDetails);
  
  loading = true;
  roadMapVisible = true;
  waterMapVisible = true;
  hotReload = false;

  readonly mapNames = ["roadMap", "waterMap"];
  readonly roadMapId = this.mapNames[0];
  readonly waterMapId = this.mapNames[1];

  mapObjects: Map<string, google.maps.Map<HTMLElement>> = new Map<string, google.maps.Map<HTMLElement>>();

  ngAfterViewInit(): void {
    this.loadMaps();
    this.$mapDetails
      .pipe(debounceTime(250))
      .subscribe( x => {
        if (this.hotReload) this.loading = true;
        this.resetMap(x);
        if (this.hotReload){
          setTimeout(() => this.capture().then(() => this.loading = false), 500);
        }
      });
  }

  async loadMaps(exclude: string | undefined = undefined) {
    this.loading = true;

    const promises = [... this.mapNames]
      .filter(x => x !== exclude)
      .map(x => this.loadMap(x).then(y => {
        if (!!y) this.mapObjects.set(x, y);
      }));

    await Promise.all(promises);
    setTimeout(() => this.capture().then(x => this.loading = false), 1000);
  }

  resetMap(details: MapDetailsType){
    [...this.mapObjects]
      .filter(x => x[0] !== this.lastChange)
      .map(x => x[1])
      .forEach(map => {
        map.setCenter({lat: details.latitude, lng: details.longitude});
        map.setZoom(details.zoom);
      });
  }

  async loadMap(mapDivId: string) {
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

  async sanitizeMap(mapDivId: string) {
    $(`#${mapDivId}>div>.gm-style>div>div>a`).remove();
    $(`#${mapDivId}>div>.gm-style>div:last`).remove();
  }

  async capture() {
    const output = document.getElementById('captureOutput') as HTMLCanvasElement;
    const output2 = document.getElementById('captureOutput2') as HTMLCanvasElement;

    // this.sanitizeMap("roadMap");
    // this.sanitizeMap("waterMap");

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
}
