import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeStructureSetupComponent } from './fee-structure-setup.component';

describe('FeeStructureSetupComponent', () => {
  let component: FeeStructureSetupComponent;
  let fixture: ComponentFixture<FeeStructureSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeStructureSetupComponent]
    });
    fixture = TestBed.createComponent(FeeStructureSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
