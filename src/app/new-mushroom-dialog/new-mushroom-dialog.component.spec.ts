import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMushroomDialogComponent } from './new-mushroom-dialog.component';

describe('NewMushroomDialogComponent', () => {
  let component: NewMushroomDialogComponent;
  let fixture: ComponentFixture<NewMushroomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMushroomDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMushroomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
