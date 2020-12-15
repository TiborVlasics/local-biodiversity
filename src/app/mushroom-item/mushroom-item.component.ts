import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mushroom-item',
  templateUrl: './mushroom-item.component.html',
  styleUrls: ['./mushroom-item.component.scss']
})
export class MushroomItemComponent implements OnInit {
  defaultSrc = "https://via.placeholder.com/1000";
  imgSrc: string | undefined;

  @Input() mushroomData: any;

  constructor() { }

  ngOnInit(): void {
    this.imgSrc = this.mushroomData.assetUrl ? `/assets/${this.mushroomData.assetUrl}` : this.defaultSrc;
  }

}
