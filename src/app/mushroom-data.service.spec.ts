import { TestBed } from '@angular/core/testing';

import { MushroomDataService } from './mushroom-data.service';

describe('MushroomDataService', () => {
  let service: MushroomDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MushroomDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
