import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  observations$!: Observable<any>;
  latitude = 46.421745;
  longitude = 16.802555;
  radius = 2.1;

  constructor(private service: MushroomDataService) {}

  ngOnInit(): void {
    this.observations$ = this.service.getObservationList(
      this.latitude, 
      this.longitude, 
      this.radius
    ).pipe(
        map((resp: any) => resp.results.map((o: any) => {
          if (o.place_guess.includes("Kálmán hegy")) {
            return { ...o, place_guess: 'a Kálmán hegyen' };
          } else if (o.place_guess.includes("Tótszentmárton")) {
            return { ...o, place_guess: 'Tótszentmártonban' };
          } else if (o.place_guess.includes("Becsehely")) {
            return { ...o, place_guess: 'Becsehely felé' };
          } else {
            return o;
          }
        })),
      )
  }

}
