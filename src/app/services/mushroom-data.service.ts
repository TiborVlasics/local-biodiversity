import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { MapBoundingBox } from '../interfaces/MapBoundingBox.interface';
import { Region } from '../interfaces/region.interface';

@Injectable({
  providedIn: 'root'
})
export class MushroomDataService {
  private iNaturalistRootApiUrl = "https://api.inaturalist.org/v1/observations";
  private readonly center: {lat: number, lng: number } = { lat: 46.421745, lng: 16.802555 };

  readonly regions: { [ key: string ]: Region } = {
    'totszentmarton': {
      id: 'totszentmarton',
      name: 'Tótszentmárton és környéke',
      latLngBounds: {
        'north': 46.436859,
        'south': 46.407920,
        'west': 16.785278,
        'east': 16.894760
      },
      imageUrl: 'http://szentmarton.martinus.hu/misc/news/11/.2016-10-12-totsztmarton1-00012.jpg'
    },
    'zajkihegy': {
      id: 'zajkihegy',
      name: 'Öreg hegy (Zajk) és környéke',
      latLngBounds: {
        'north': 46.473706,
        'south': 46.444759,
        'west': 16.708516,
        'east': 16.734236
      },
      imageUrl: 'https://media.funiq.hu/images/27/6b/23598_orig_art721.jpg'
    }
  };

  private observationList: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private selectedObservation: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private selectedRegion: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private taxonList: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private selectedTaxon: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private googleApiLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loadGoogleApi$().subscribe(result => this.googleApiLoaded.next(result));
    this.setRegionOnNavigation$().subscribe();
    this.loadObservations$().subscribe();
    this.loadTaxonList$().subscribe();
    this.selectedTaxon.subscribe()
  }

  public fetchObservationList(lat: number, lng: number, radius: number) {
    return this.http.get(`${this.iNaturalistRootApiUrl}/?lat=${lat}&lng=${lng}&radius=${radius}&order=desc&order_by=created_at`)
      .pipe(
        tap((resp: any) => this.observationList.next(resp.results)),
        tap((results: any) => console.log(results)),
      );
  }

  public fetchObservationListRect(latLngBounds: MapBoundingBox) {
    return this.http.get(`${this.iNaturalistRootApiUrl}?nelat=${latLngBounds.north}&nelng=${latLngBounds.east}&swlat=${latLngBounds.south}&swlng=${latLngBounds.west}&order=desc&order_by=created_at`)
    .pipe(
      map((resp: any) => resp.results)
    );
  }

  public fetchObservationListRectByTaxon(latLngBounds: MapBoundingBox, taxonId: string) {
    return this.http.get(`${this.iNaturalistRootApiUrl}?taxon_id=${taxonId}&nelat=${latLngBounds.north}&nelng=${latLngBounds.east}&swlat=${latLngBounds.south}&swlng=${latLngBounds.west}&order=desc&order_by=created_at`)
    .pipe(
      map((resp: any) => resp.results)
    );
  }

  public fetchTaxonList(latLngBounds: MapBoundingBox) {
    return this.http.get(`${this.iNaturalistRootApiUrl}/species_counts?nelat=${latLngBounds.north}&nelng=${latLngBounds.east}&swlat=${latLngBounds.south}&swlng=${latLngBounds.west}`);
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

  public getSelectedRegion$(): Observable<Region> {
    return this.selectedRegion.asObservable();
  }

  public getCenter() {
    return this.center;
  }

  public getAllRegions(): Observable<any> {
    return of(this.regions);
  }

  public getObservationList$() {
    return this.observationList.asObservable();
  }

  public getSelectedTaxonId$() {
    return this.selectedTaxon.asObservable();
  }

  public getTaxons$(): Observable<any> {
    return this.taxonList.asObservable();
  }

  private loadTaxonList$(): Observable<any> {
    return this.getSelectedRegion$().pipe(
      distinctUntilChanged(),
      switchMap((region: Region) => region 
          ? this.fetchTaxonList(region.latLngBounds)
          : of(undefined)),
      tap(results => {
        results
          ? this.taxonList.next(results)
          : this.taxonList.next([]);
      })
    )
  }
  
  public isLoading$() {
    return this.isLoading.asObservable();
  }

  public setLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }

  public isGoogleApiLoaded$(): Observable<boolean> {
    return this.googleApiLoaded.asObservable();
  }

  private setRegionOnNavigation$() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => this.route.firstChild ? this.route.firstChild.params : of(undefined)),
      tap((params: any) => {
        if (params.regionId) {
          this.selectedRegion.next(this.regions[params.regionId]);
        } else {
          this.selectedRegion.next(undefined);
        }
        if(params.taxonId) {
          this.selectedTaxon.next(params.taxonId)
        } else {
          this.selectedTaxon.next(undefined);
        }
      })
    )
  }

  private loadObservations$(): Observable<any> {
    return combineLatest([
      this.getSelectedRegion$(),
      this.selectedTaxon
    ]).pipe(
      switchMap(([region, taxonId]: [Region, string]) => {
        if(taxonId) {
          return this.fetchObservationListRectByTaxon(region.latLngBounds, taxonId);
        } 
        return of(undefined);
      }),
      tap(results => results 
          ? this.observationList.next(results)
          : this.observationList.next([])
      )
    )
  }

  private loadGoogleApi$() {
    return this.http.jsonp(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDn_3kc65-cEuU91fjWnzfBrMQGSLebGhU`,
      'callback'
    ).pipe(
      map(() => true),
      catchError(() => of(false))
    )
  }

}
