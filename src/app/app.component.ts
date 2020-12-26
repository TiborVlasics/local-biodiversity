import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { MushroomDataService } from './services/mushroom-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Local-biodiversity';
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  radius = 2.1;

  hasBackdrop = false;
  autosize = true;
  mode = 'side' as MatDrawerMode;
  position = 'end' as 'start' | 'end';
  fixedInViewport = false;
  fixedTopGap = 0;
  disableClose = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: MushroomDataService
  ) { }

  ngOnInit(): void {
    this.service.fetchObservationList(
      this.service.getCenter().lat, 
      this.service.getCenter().lng, 
      this.radius
    ).subscribe();

    this.isExtraSmall.subscribe(result => {
      if(result.matches) {
        this.mode = 'over';
        this.autosize = false;
        this.fixedInViewport = true;
        this.fixedTopGap = window.innerHeight / 4 * 3;
      } else {
        this.mode = 'side';
        this.autosize = true;
        this.fixedInViewport = false;
        this.fixedTopGap = 0;
      }
    });
  }

}
