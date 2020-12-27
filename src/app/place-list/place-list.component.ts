import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Region } from '../interfaces/region.interface';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {
  regions: Observable<{ [ key: string ]: Region }> | undefined;

  constructor(
    private service: MushroomDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.regions = this.service.getAllRegions();
  }

  selectRegion(regionId: string) {
    this.router.navigate(['regions', regionId])
  }

}
