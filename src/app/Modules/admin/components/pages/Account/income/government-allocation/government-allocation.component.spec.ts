import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentAllocationComponent } from './government-allocation.component';

describe('GovernmentAllocationComponent', () => {
  let component: GovernmentAllocationComponent;
  let fixture: ComponentFixture<GovernmentAllocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GovernmentAllocationComponent]
    });
    fixture = TestBed.createComponent(GovernmentAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
