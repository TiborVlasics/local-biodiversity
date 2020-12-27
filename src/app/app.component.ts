import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MushroomDataService } from './services/mushroom-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  selectedPlace$: Observable<any> | undefined;

  hasBackdrop = false;
  autosize = true;
  mode = 'side' as MatDrawerMode;
  position = 'end' as 'start' | 'end';
  fixedInViewport = false;
  fixedTopGap = 0;
  disableClose = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: MushroomDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {    
    this.selectedPlace$ = this.service.getSelectedRegion$();

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
