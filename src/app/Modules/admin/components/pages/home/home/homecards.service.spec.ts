import { TestBed } from '@angular/core/testing';

import { HomecardsService } from './homecards.service';

describe('HomecardsService', () => {
  let service: HomecardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomecardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
