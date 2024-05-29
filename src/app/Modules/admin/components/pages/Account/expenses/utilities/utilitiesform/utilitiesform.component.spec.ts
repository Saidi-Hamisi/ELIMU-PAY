import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitiesformComponent } from './utilitiesform.component';

describe('UtilitiesformComponent', () => {
  let component: UtilitiesformComponent;
  let fixture: ComponentFixture<UtilitiesformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilitiesformComponent]
    });
    fixture = TestBed.createComponent(UtilitiesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
