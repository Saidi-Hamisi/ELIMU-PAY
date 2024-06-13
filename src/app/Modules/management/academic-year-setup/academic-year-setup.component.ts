import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-academic-year-setup',
  templateUrl: './academic-year-setup.component.html',
  styleUrls: ['./academic-year-setup.component.css']
})
export class AcademicYearSetupComponent implements OnInit {
  academicYearForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.academicYearForm = this.fb.group({
      academicYearName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, { validators: this.dateValidator });
  }

  dateValidator(group: AbstractControl): ValidationErrors | null {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;
    return startDate && endDate && startDate > endDate ? { 'dateMismatch': true } : null;
  }

  onSubmit() {
    if (this.academicYearForm.valid) {
      // Submit the form data
      console.log(this.academicYearForm.value);
    } else {
      // Handle form validation errors
      console.error("Form is invalid.");
    }
  }
}
