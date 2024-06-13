import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeInstallmentPlansComponent } from './fee-installment-plans.component';

describe('FeeInstallmentPlansComponent', () => {
  let component: FeeInstallmentPlansComponent;
  let fixture: ComponentFixture<FeeInstallmentPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeInstallmentPlansComponent]
    });
    fixture = TestBed.createComponent(FeeInstallmentPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
