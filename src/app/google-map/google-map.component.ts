import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, switchMap, take } from 'rxjs/operators';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, AfterViewInit {
  apiLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  markers$: Observable<any[]> | undefined

  mapOptions: google.maps.MapOptions = {
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
    tilt: 45,
    streetViewControl: false,
    mapTypeId: 'satellite'
  }

  constructor(
    private httpClient: HttpClient,
    private service: MushroomDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    httpClient.jsonp(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDn_3kc65-cEuU91fjWnzfBrMQGSLebGhU`,
      'callback'
    ).pipe(
      map(() => true),
      catchError(() => of(false)),
    ).subscribe(result => {
      this.apiLoaded.next(result)}
    );
  }
  
  ngAfterViewInit(): void {
    this.markers$ = this.apiLoaded.pipe(
      filter(isLoaded => !!isLoaded),
      switchMap(() => this.service.getObservationList$()),
      filter(o => !!o),
      map(results => {
        return results.map((observation: any) => {
          const latlng = observation.location.split(',');
          return {
            position: { 
              lat: Number(latlng[0]),
              lng: Number(latlng[1])
            },
            observationId: observation.id
          };
        })
      }),
    )
  }

  ngOnInit(): void {
    this.mapOptions.center = this.service.getCenter();
    this.service.getSelectedRegion$().pipe(
      filter(region => !!region),
      distinctUntilChanged()
    ).subscribe(region => {
      this.mapOptions = {
        ...this.mapOptions,
        restriction: {
          ...this.mapOptions.restriction,
          latLngBounds: <google.maps.LatLngBoundsLiteral>region.latLngBounds
        }
      };
    });
  }

  onMarkerClick(event: any, observationId: string) {
    this.route.firstChild?.paramMap.pipe(
      take(1)
    ).subscribe(paramMap => {
      this.router.navigate([
        'regions',
        paramMap.get('regionId'),
        'observations', observationId
      ], { 
        replaceUrl: true 
      });
    })
  }

}
