import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { MushroomDataService } from './services/mushroom-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  selectedPlace$: Observable<any> | undefined;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  hasBackdrop = false;
  autosize = true;
  mode = 'side' as MatDrawerMode;
  position = 'start' as 'start' | 'end';
  fixedInViewport = false;
  fixedTopGap = 0;
  disableClose = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: MushroomDataService,
  ) { }

  ngOnInit(): void {    
    this.selectedPlace$ = this.service.getSelectedRegion$();

    this.isExtraSmall.subscribe(result => {
      if(result.matches) {
        this.mode = 'over';
        this.autosize = false;
        this.fixedInViewport = true;
        this.fixedTopGap = window.innerHeight / 6 * 3;
      } else {
        this.mode = 'side';
        this.autosize = true;
        this.fixedInViewport = false;
        this.fixedTopGap = 0;
      }
    });
  }

  ngAfterViewInit(): void {
    this.service.getSelectedTaxonId$().subscribe(taxon => {
      taxon ? this.sidenav.open() : this.sidenav.close()
    })
  }


}
