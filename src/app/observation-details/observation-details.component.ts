import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
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
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.isLoading = this.service.isLoading$();
  
    this.route.params.pipe(
      switchMap(params => this.service.fetchObservationDetails(params.id))
    ).subscribe();

    this.selectedObservation$ = combineLatest([
      this.service.getSelectedObservation$(),
      this.breakpointObserver.observe(Breakpoints.XSmall)
    ]).pipe(
      filter(([observation]) => !!observation),
      map(([observation, breakPoint]) => {
        const imageSize = breakPoint.matches ? 'small' : 'medium';
        const image = observation.photos[0].url.replace('square', imageSize)
        return ({ ...observation, imgUrl: image });
      }),
    )
  }

  backToList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
