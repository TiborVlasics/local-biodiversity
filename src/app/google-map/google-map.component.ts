import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, OnDestroy {
  notifier = new Subject()
  apiLoaded: Observable<boolean> | undefined;
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
    private service: MushroomDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.apiLoaded = this.service.isGoogleApiLoaded$();
  }

  ngOnInit(): void {
    this.mapOptions.center = this.service.getCenter();
    this.service.getSelectedRegion$().pipe(
      takeUntil(this.notifier),
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

    this.markers$ = this.service.isGoogleApiLoaded$().pipe(
      takeUntil(this.notifier),
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

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }

  onMarkerClick(observationId: string) {
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
