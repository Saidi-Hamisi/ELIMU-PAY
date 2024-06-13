import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeZoneAndLanguageComponent } from './time-zone-and-language.component';

describe('TimeZoneAndLanguageComponent', () => {
  let component: TimeZoneAndLanguageComponent;
  let fixture: ComponentFixture<TimeZoneAndLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeZoneAndLanguageComponent]
    });
    fixture = TestBed.createComponent(TimeZoneAndLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
