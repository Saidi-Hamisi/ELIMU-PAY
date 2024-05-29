import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesformComponent } from './suppliesform.component';

describe('SuppliesformComponent', () => {
  let component: SuppliesformComponent;
  let fixture: ComponentFixture<SuppliesformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliesformComponent]
    });
    fixture = TestBed.createComponent(SuppliesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
