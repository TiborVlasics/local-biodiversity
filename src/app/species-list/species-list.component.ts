import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss']
})
export class SpeciesListComponent implements OnInit {
  species$!: Observable<any>;

  constructor(private service: MushroomDataService) { }

  ngOnInit(): void {
    this.species$ = this.service.getTaxons$().pipe(map(response => response.results),tap(l => console.log(l)));
  }

}
