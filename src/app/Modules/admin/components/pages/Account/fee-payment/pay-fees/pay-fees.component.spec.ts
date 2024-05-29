import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFeesComponent } from './pay-fees.component';

describe('PayFeesComponent', () => {
  let component: PayFeesComponent;
  let fixture: ComponentFixture<PayFeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayFeesComponent]
    });
    fixture = TestBed.createComponent(PayFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
