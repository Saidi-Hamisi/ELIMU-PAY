import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeecategoryService } from '../service/feecategory.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  AddEditForm: FormGroup;
  Category: string[] = ['Tuition', 'Transport zone 1', 'Transport zone 2', 'Transport zone 3', 'Catering', 'others']; // Define an array of categories
  grade: string[] = ['PRIMARY', 'SECONDARY', 'TERTIARY', 'OTHER']; // Define an array of grades
  term: string[] = ['Term1', 'Term2', 'Term3', ]; // Define an array of grades


  constructor(private _fb: FormBuilder, private _FeecategoryService: FeecategoryService, private _dialogRef: MatDialogRef<AddEditComponent>) {
    this.AddEditForm = this._fb.group({
      // Define your form controls here:
      name: ['', Validators.required],
      categorycode: ['', Validators.required],
      description: ['', Validators.required],
      grade: ['', Validators.required],
      term: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]], // Add pattern validation for numeric input
      // apply: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization code
  }

  onFormSubmit() {
    if (this.AddEditForm.valid) {
      this._FeecategoryService.addFeecategory(this.AddEditForm.value).subscribe({
        next: (val: any) => {
          alert('FeeCategory added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      this.markFormGroupTouched(this.AddEditForm);
    }
  }

  // Helper method to mark all fields as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
