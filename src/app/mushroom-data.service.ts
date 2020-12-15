import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MushroomDataService {

  private apiUrl = "http://localhost:3000/api/mushroom";

  constructor(private http: HttpClient) {
  }

  public getMushroomList$(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public addNewMushroom(mushroomData: any) {
    return this.http.post(this.apiUrl, mushroomData);
  }
}
