import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MushroomDataService } from '../mushroom-data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  mushrooms$!: Observable<any>;

  constructor(private service: MushroomDataService) {
  }

  ngOnInit(): void {
    this.mushrooms$ = this.service.getMushroomList$().pipe(
      tap(a => console.log(a)));
  }

}
