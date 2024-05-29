import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersmaintainanceComponent } from './suppliersmaintainance.component';

describe('SuppliersmaintainanceComponent', () => {
  let component: SuppliersmaintainanceComponent;
  let fixture: ComponentFixture<SuppliersmaintainanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersmaintainanceComponent]
    });
    fixture = TestBed.createComponent(SuppliersmaintainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
