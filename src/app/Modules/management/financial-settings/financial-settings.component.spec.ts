import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialSettingsComponent } from './financial-settings.component';

describe('FinancialSettingsComponent', () => {
  let component: FinancialSettingsComponent;
  let fixture: ComponentFixture<FinancialSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialSettingsComponent]
    });
    fixture = TestBed.createComponent(FinancialSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
