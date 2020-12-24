import { Component, OnInit } from '@angular/core';
import { MushroomDataService } from './services/mushroom-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mushroom-repository';
  radius = 2.1;

  constructor(private service: MushroomDataService) { }

  ngOnInit(): void {
    this.service.fetchObservationList(
      this.service.getCenter().lat, 
      this.service.getCenter().lng, 
      this.radius
    ).subscribe();
  }

}
