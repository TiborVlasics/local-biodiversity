import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  readonly mapOptions: google.maps.MapOptions = {
    zoom: 15,
    minZoom: 15,
    controlSize: 24,
    restriction: {
      latLngBounds: {
        north: 46.434,
        south: 46.406,
        west: 16.77,
        east: 16.837
      },
      strictBounds: true
    },
    streetViewControl: false,
    mapTypeId: 'satellite'
  }
  apiLoaded: Observable<boolean>;

  constructor(
    private httpClient: HttpClient,
    private service: MushroomDataService
  ) {
    this.apiLoaded = httpClient.jsonp(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDn_3kc65-cEuU91fjWnzfBrMQGSLebGhU`,
      'callback'
    ).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  ngOnInit(): void {
    this.mapOptions.center = this.service.getCenter();
  }

}
