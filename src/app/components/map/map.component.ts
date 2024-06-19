import { Component, OnInit } from '@angular/core';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { Feature, Map } from 'ol';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import { Geometry, Point } from 'ol/geom';
import { Style, Stroke, Circle, Fill } from 'ol/style';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  constructor(private mapService: MapService) {}

  map: Map | undefined;

  // Define the style for line features
  lineStyle = new Style({
    stroke: new Stroke({
      color: '#ffcc33',
      width: 4,
    }),
  });

  vectorSource: VectorSource = new VectorSource({
    features: [],
  });

  vectorLayer = new VectorLayer({
    source: this.vectorSource,
    style: this.lineStyle,
  });

  pointStyle = new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({ color: 'red' }),
    }),
  });

  calgaryCoords = [-114.11388000463317, 51.046448538027505];
  calgaryMercator = fromLonLat(this.calgaryCoords);

  /**
   * @description add a new point to the map
   */
  displayNewPointOnMap(newCoordinate: number[]) {
    const pointGeometry = new Point(fromLonLat(newCoordinate));
    const pointFeature = new Feature(pointGeometry);
    pointFeature.setStyle(this.pointStyle);
    this.vectorSource.addFeature(pointFeature);
  }

  // ionViewDidEnter() {
  ngOnInit() {
    this.mapService.newPoint$.subscribe((newPoint: number[] | null) => {
      if (newPoint) {
        this.displayNewPointOnMap(newPoint);
      }
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ],
      view: new View({
        center: this.calgaryMercator,
        zoom: 14,
      }),
    });

    console.log('Map:', this.map);
  }
}
