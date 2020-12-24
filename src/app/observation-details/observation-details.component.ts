import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-observation-details',
  templateUrl: './observation-details.component.html',
  styleUrls: ['./observation-details.component.scss']
})
export class ObservationDetailsComponent implements OnInit {
  selectedObservation$: Observable<any> | undefined;

  constructor(
    private service: MushroomDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
      switchMap(params => this.service.fetchObservationDetails(params.id))
    ).subscribe();
    this.selectedObservation$ = this.service.getSelectedObservation$();
    this.selectedObservation$.subscribe(a => console.log(a));
  }

}
