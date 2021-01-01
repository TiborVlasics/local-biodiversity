import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss']
})
export class SpeciesListComponent implements OnInit {
  species$!: Observable<any>;

  constructor(
    private service: MushroomDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.species$ = this.service.getTaxons$().pipe(map(response => response.results),tap(l => console.log(l)));
  }

  selectItem(taxonId: string) {
    this.route.paramMap.pipe(
      take(1)
    ).subscribe(paramMap => {
      this.router.navigate([
        'regions',
        paramMap.get('regionId'),
        'taxons', 
        taxonId
      ]);
    })
  }

  backToRegions() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

}
