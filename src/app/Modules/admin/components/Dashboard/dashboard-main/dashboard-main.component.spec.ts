import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainComponent } from './DashboardMainComponent';

describe('DashboardMainComponent', () => {
  let component: DashboardMainComponent;
  let fixture: ComponentFixture<DashboardMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMainComponent],
    });
    fixture = TestBed.createComponent(DashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
