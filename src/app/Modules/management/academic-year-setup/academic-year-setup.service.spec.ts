import { TestBed } from '@angular/core/testing';

import { AcademicYearSetupService } from './academic-year-setup.service';

describe('AcademicYearSetupService', () => {
  let service: AcademicYearSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicYearSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
