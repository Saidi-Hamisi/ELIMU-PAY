import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-grade-section-setup',
  templateUrl: './grade-and-section-setup.component.html',
  styleUrls: ['./grade-and-section-setup.component.css']
})
export class GradeSectionSetupComponent implements OnInit {
  gradeandSectionForm!: FormGroup;
  currentAcademicYear!: string;
  grades: string[] = [
    'Preprimary 1',
    'Preprimary 2',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Simulate fetching the current academic year
    this.currentAcademicYear = this.getCurrentAcademicYear();

    this.gradeandSectionForm = this.fb.group({
      currentAcademicYear: [{ value: this.currentAcademicYear, disabled: true }],
      gradeSectionName: ['', Validators.required],
      selectedGrades: this.buildGrades()
    });
  }

  getCurrentAcademicYear(): string {
    // Fetch the current academic year from your service or data source
    // This is just a placeholder value for demonstration
    return '2023-2024';
  }

  buildGrades(): FormArray {
    const arr = this.grades.map(() => new FormControl(false));
    return new FormArray(arr);
  }

  get selectedGrades(): FormArray {
    return this.gradeandSectionForm.get('selectedGrades') as FormArray;
  }

  onSubmit(): void {
    if (this.gradeandSectionForm.valid) {
      const selectedGradeValues = (this.gradeandSectionForm.value.selectedGrades as boolean[])
        .map((checked: boolean, i: number) => (checked ? this.grades[i] : null))
        .filter((v): v is string => v !== null);

      const formData = {
        currentAcademicYear: this.currentAcademicYear,
        gradeSectionName: this.gradeandSectionForm.get('gradeSectionName')?.value,
        selectedGrades: selectedGradeValues
      };

      console.log('Form Data:', formData);
      // Perform your submission logic here
    }
  }
}
