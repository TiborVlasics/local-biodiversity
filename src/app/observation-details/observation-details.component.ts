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
    this.isLoading = this.service.isLoading$();
  
    this.route.params.pipe(
      tap(() => this.service.setLoading(true)),
      switchMap(params => this.service.fetchObservationDetails(params.id))
    ).subscribe();

    this.selectedObservation$ = this.service.getSelectedObservation$().pipe(
      filter(o => !!o),
      tap(() => this.service.setLoading(false)),
      map((observation: any) => {
        const image = observation.photos[0].url.replace('square', 'medium')
        return ({ ...observation, imgUrl: image });
      }),
      tap(a => console.log(a))
    )
  }

  backToList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
