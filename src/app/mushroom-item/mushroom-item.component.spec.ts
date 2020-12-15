import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MushroomItemComponent } from './mushroom-item.component';

describe('MushroomItemComponent', () => {
  let component: MushroomItemComponent;
  let fixture: ComponentFixture<MushroomItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MushroomItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MushroomItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
