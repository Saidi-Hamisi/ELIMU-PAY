import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplliersLookUpsComponent } from './supplliers-look-ups.component';

describe('SupplliersLookUpsComponent', () => {
  let component: SupplliersLookUpsComponent;
  let fixture: ComponentFixture<SupplliersLookUpsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplliersLookUpsComponent]
    });
    fixture = TestBed.createComponent(SupplliersLookUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
