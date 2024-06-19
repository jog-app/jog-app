import { EventEmitter, Injectable } from '@angular/core';
import { Position } from 'geojson';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  private readonly newPoint = new EventEmitter<number[] | null>();
  public readonly newPoint$ = this.newPoint.asObservable();

  /**
   * @param position
   * @description Convert the GeolocationPosition object to a number[] and emit it to the newPoint EventEmitter. 
   *              Map Listener will pick it up and display it on the map.  
   * @returns void  
   */
  public addPointToMap(position: GeolocationPosition): void {
    const { latitude, longitude } = position?.coords;
    const newCoordinate = [longitude, latitude];

    this.newPoint.emit(newCoordinate);
  }
}
