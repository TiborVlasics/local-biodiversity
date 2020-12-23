import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MushroomDataService {
  private readonly center: {lat: number, lng: number } = { lat: 46.421745, lng: 16.802555 };

  private observationList: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private apiUrl = "http://localhost:3000/api/mushroom";
  private iNaturalistRootApiUrl = "https://api.inaturalist.org/v1/observations";

  constructor(private http: HttpClient) {
  }

  public fetchObservationList(lat: number, lng: number, radius: number) {
    return this.http.get(`${this.iNaturalistRootApiUrl}/?lat=${lat}&lng=${lng}&radius=${radius}&order=desc&order_by=created_at`)
      .pipe(
        tap((resp: any) => this.observationList.next(resp.results))
      )
  }

  public getCenter() {
    return this.center;
  }

  public fetchMushroomList$(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      tap(list => this.observationList.next(list))
    )
  }

  public createMushroom$(mushroomData: any) {
    return this.http.post(this.apiUrl, mushroomData);
  }

  public getObservationList$() {
    return this.observationList.asObservable();
  }

  public addMushroom(mushroomData: any) {
    const list = this.observationList.value;
    const newList = [...list, mushroomData]
    this.observationList.next(newList);
  }
}
