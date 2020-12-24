import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  observations$!: Observable<any>;

  constructor(private service: MushroomDataService) {}

  ngOnInit(): void {
    this.observations$ = this.service.getObservationList$().pipe(
      filter(r => !!r),
      map((results: any) => results.map((o: any) => {
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
