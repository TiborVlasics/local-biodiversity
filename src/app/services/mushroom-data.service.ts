import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MushroomDataService {

  private mushroomList: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private apiUrl = "http://localhost:3000/api/mushroom";
  private iNaturalistRootApiUrl = "https://api.inaturalist.org/v1/observations";

  constructor(private http: HttpClient) {
  }

  public getObservationList(lat: number, lng: number, radius: number) {
    return this.http.get(`${this.iNaturalistRootApiUrl}/?lat=${lat}&lng=${lng}&radius=${radius}&order=desc&order_by=created_at`)
  }

  public fetchMushroomList$(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      tap(list => this.mushroomList.next(list))
    )
  }

  public createMushroom$(mushroomData: any) {
    return this.http.post(this.apiUrl, mushroomData);
  }

  public getMushroomList$() {
    return this.mushroomList.asObservable();
  }

  public addMushroom(mushroomData: any) {
    const list = this.mushroomList.value;
    const newList = [...list, mushroomData]
    this.mushroomList.next(newList);
  }
}
