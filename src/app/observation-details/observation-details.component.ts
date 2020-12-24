import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-observation-details',
  templateUrl: './observation-details.component.html',
  styleUrls: ['./observation-details.component.scss']
})
export class ObservationDetailsComponent implements OnInit {
  selectedObservation$: Observable<any> | undefined;

  constructor(private service: MushroomDataService) { }

  ngOnInit(): void {
    this.selectedObservation$ = this.service.getSelectedObservation$();
    this.selectedObservation$.subscribe(a => console.log(a));
  }

}
