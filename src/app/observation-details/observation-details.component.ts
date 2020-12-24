import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-observation-details',
  templateUrl: './observation-details.component.html',
  styleUrls: ['./observation-details.component.scss']
})
export class ObservationDetailsComponent implements OnInit {
  selectedObservation$: Observable<any> | undefined;
  isLoading!: Observable<boolean>;

  constructor(
    private service: MushroomDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = this.service.isLoading$().pipe(tap(a => console.log(a)));
  
    this.route.params.pipe(
      switchMap(params => this.service.fetchObservationDetails(params.id))
    ).subscribe();

    this.selectedObservation$ = this.service.getSelectedObservation$().pipe(
      filter(o => !!o),
      map((observation: any) => {
        const image = observation.photos[0].url.replace('square', 'medium')
        return ({ ...observation, imgUrl: image });
      }),
    )
  }

  backToList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
