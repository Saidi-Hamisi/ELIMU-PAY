import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-fee-structure-setup',
  templateUrl: './fee-structure-setup.component.html',
  styleUrls: ['./fee-structure-setup.component.css']
})
export class FeeStructureSetupComponent implements OnInit {
  feeStructureForm: FormGroup;
  feeCategoriesForm: FormGroup;
  displayedColumns: string[] = ['number', 'feeCategory', 'description', 'amount', 'actions'];

  studentSections = ['Section A', 'Section B', 'Section C'];
  academicTerms = ['Term 1', 'Term 2', 'Term 3'];
  academicYears = ['2023-2024', '2024-2025', '2025-2026'];

  constructor(private fb: FormBuilder) {
    this.feeStructureForm = this.fb.group({
      studentSection: ['', Validators.required],
      academicTerm: ['', Validators.required],
      academicYear: ['', Validators.required]
    });

    this.feeCategoriesForm = this.fb.group({
      feeCategories: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addFeeCategory(); // Add one row initially
  }

  get feeCategories(): FormArray {
    return this.feeCategoriesForm.get('feeCategories') as FormArray;
  }

  createFeeCategory(): FormGroup {
    return this.fb.group({
      feeCategory: ['', Validators.required],
      description: [''],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  addFeeCategory(): void {
    this.feeCategories.push(this.createFeeCategory());
  }

  removeFeeCategory(index: number): void {
    this.feeCategories.removeAt(index);
  }

  onCancel(): void {
    this.feeCategories.clear();
    this.addFeeCategory(); // Add one row back after clearing
  }

  onSubmit(): void {
    if (this.feeStructureForm.valid && this.feeCategoriesForm.valid) {
      const feeStructureData = {
        ...this.feeStructureForm.value,
        feeCategories: this.feeCategoriesForm.value.feeCategories
      };
      console.log('Fee Structure Data:', feeStructureData);
      // Add the logic to save the fee structure data to your backend here
    }
  }
}
