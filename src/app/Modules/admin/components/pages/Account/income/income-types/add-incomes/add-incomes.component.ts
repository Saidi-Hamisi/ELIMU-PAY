import { CoreService } from 'src/@Core/core/core.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IncomeTypesService } from '../income-types.service';

@Component({
  selector: 'app-add-system-user',
  templateUrl: './add-incomes.component.html',
  styleUrls: ['./add-incomes.component.css'],
})
export class AddIncomesComponent implements OnInit {
  SystemUserForm!: FormGroup;

  role: string[] = [
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Form 1',
    'Form 2',
    'Form 3',
    'Form 4',
  ];
  private _addSystemuserService: any;
AddIncomeForm: any;

  constructor(
    private _fb: FormBuilder,
    private _IncomeTypesService: IncomeTypesService,
    private _dialogueRef: MatDialogRef<AddIncomesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.SystemUserForm = this._fb.group({
      firstName: '',
      amount: '',
      // lastName: '',
      // email: '',
      // dob: '',
      // gender: '',
      // role: '',
      // phoneNumber: '',
      // address: '',
      // nationality: '',
      // school: '',
      // idNumber: '',
    });
  }

  ngOnInit(): void {
    this.SystemUserForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.SystemUserForm.valid) {
      if (this.data) {
        this._addSystemuserService
          .updateSystemUser(this.data.id, this.SystemUserForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Fee category  details updated!');
              this._dialogueRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._addSystemuserService
          .addSystemUser(this.SystemUserForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'Fee category added successfully! ☺'
              );
              this._dialogueRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      }
    }
  }
}
