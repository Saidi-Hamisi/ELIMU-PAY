import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncomesComponent } from './add-incomes.component';

describe('AddIncomesComponent', () => {
  let component: AddIncomesComponent;
  let fixture: ComponentFixture<AddIncomesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIncomesComponent],
    });
    fixture = TestBed.createComponent(AddIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
