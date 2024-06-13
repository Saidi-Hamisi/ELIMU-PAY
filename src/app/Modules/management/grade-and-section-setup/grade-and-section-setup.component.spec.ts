import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { GradeSectionSetupComponent } from './grade-and-section-setup.component';

describe('GradeSectionSetupComponent', () => {
  let component: GradeSectionSetupComponent;
  let fixture: ComponentFixture<GradeSectionSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradeSectionSetupComponent],
      imports: [
        ReactiveFormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GradeSectionSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
