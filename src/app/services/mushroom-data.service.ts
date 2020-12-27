import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MapBoundingBox } from '../interfaces/MapBoundingBox.interface';

@Injectable({
  providedIn: 'root'
})
export class MushroomDataService {
  private readonly center: {lat: number, lng: number } = { lat: 46.421745, lng: 16.802555 };

  readonly places: { [ key: string ]: MapBoundingBox } = {
    'totszentmarton': {
      'north': 46.436859,
      'south': 46.407920,
      'west': 16.785278,
      'east': 16.894760
    },
    'zajkihegy': {
      'north': 46.473706,
      'south': 46.444759,
      'west': 16.708516,
      'east': 16.734236
    }
  };

  private observationList: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private selectedObservation: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private iNaturalistRootApiUrl = "https://api.inaturalist.org/v1/observations";

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  public fetchObservationList(lat: number, lng: number, radius: number) {
    return this.http.get(`${this.iNaturalistRootApiUrl}/?lat=${lat}&lng=${lng}&radius=${radius}&order=desc&order_by=created_at`)
      .pipe(
        tap((resp: any) => this.observationList.next(resp.results))
      );
  }

  public fetchObservationListRect(coords: MapBoundingBox) {
    return this.http.get(`${this.iNaturalistRootApiUrl}?nelat=${coords.north}&nelng=${coords.east}&swlat=${coords.south}&swlng=${coords.west}&order=desc&order_by=created_at`)
    .pipe(
      tap((resp: any) => this.observationList.next(resp.results))
    );
  }

  public fetchObservationDetails(observationId: string) {
    this.isLoading.next(true);
    return this.http.get(`${this.iNaturalistRootApiUrl}/${observationId}`)
      .pipe(
        map((resp: any) => resp.results[0]),
        tap((resp: any) => {
          this.selectedObservation.next(resp);
          this.isLoading.next(false);
        }, () => {
          this.isLoading.next(false);
        })
      );
  }

  public getSelectedObservation$() {
    return this.selectedObservation.asObservable();
  }

  public getCenter() {
    return this.center;
  }

  public getObservationList$() {
    return this.observationList.asObservable();
  }

  public setLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }

  public isLoading$() {
    return this.isLoading.asObservable();
  }
}
