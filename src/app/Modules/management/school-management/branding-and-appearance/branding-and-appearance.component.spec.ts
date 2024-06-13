import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandingAndAppearanceComponent } from './branding-and-appearance.component';

describe('BrandingAndAppearanceComponent', () => {
  let component: BrandingAndAppearanceComponent;
  let fixture: ComponentFixture<BrandingAndAppearanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandingAndAppearanceComponent]
    });
    fixture = TestBed.createComponent(BrandingAndAppearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
