import { CoreService } from 'src/@Core/core/core.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpensesService } from '../expenses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {
  ParentForm!: FormGroup;
  isSubmitting:boolean = false;

  // role: string[] = [
  //   'School Administrator',
  //   'School Director',
  //   'School Manager',
  //   'Principal',
  //   'School Accountant',
  //   'Chief Finance Officer',
  //   'School Bursar',
  //   'Parent',
  // ];

  // schools: string[] = [
  //   'Bahati Girls High School',
  //   'Cherangani High School'
  // ];
  private _suppliesService: any;
  ExpensesForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private service: ExpensesService,
    private _dialogRef: MatDialogRef<AddExpensesComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this. ExpensesForm = this._fb.group({
      amount: [''],
      expenseID: [''],
      description: [''],
      name: [''],
      // expensetype:'',
      // email_address: [''],
      // physical_addres: [''],
     
      // id_passport:[''],
      // country: [''],
      // occupation: [''],
      // title:[''],
      // parentId:[''],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.ExpensesForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    
    // Extracting only the date part from the date_of_birth field
    const dateOfBirth = this.ExpensesForm.get('date_of_birth')?.value;
    const dateOfBirthDate = new Date(dateOfBirth);
    dateOfBirthDate.setHours(0, 0, 0, 0); // Set time to midnight
    this.ExpensesForm.get('date_of_birth')?.setValue(dateOfBirthDate.toISOString().split('T')[0]);

    console.log("1234567", this.ExpensesForm.value);
    
    if (this.ExpensesForm.valid) {
      this.isSubmitting = true
      if (this.data) {
        this.service.updateExpenses(this.data.id, this.ExpensesForm.value).subscribe({
          next: () => {
            this._coreService.openSnackBar('Expenses details updated!');
            this._dialogRef.close(true);
            this.isSubmitting = false
          },
          error: (err:any) => {
            console.error(err);
            this.isSubmitting = false
          },
          complete() {
            
          },
        });
      } else {
        this.service.addExpenses(this.ExpensesForm.value).subscribe(
          ((res) => {
            console.log(res)
            
          }),
          ((error) => {
            console.error(error);
            this.isSubmitting = false
          }),
          () => {
            this.snackBar.open('Expense added successfully! ', "Close" , {duration:3600, verticalPosition:"top"});
            this._dialogRef.close(true);
            this.isSubmitting = false
          }
        );
      }
    
  }
}

}