import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearSetupComponent } from './academic-year-setup.component';

describe('AcademicYearSetupComponent', () => {
  let component: AcademicYearSetupComponent;
  let fixture: ComponentFixture<AcademicYearSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicYearSetupComponent]
    });
    fixture = TestBed.createComponent(AcademicYearSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
