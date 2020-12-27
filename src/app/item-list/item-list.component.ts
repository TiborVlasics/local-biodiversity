import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  observations$!: Observable<any>;

  constructor(
    private service: MushroomDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.observations$ = this.service.getObservationList$().pipe(
      filter(r => !!r),
    )
  }

  backToRegions() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

}
