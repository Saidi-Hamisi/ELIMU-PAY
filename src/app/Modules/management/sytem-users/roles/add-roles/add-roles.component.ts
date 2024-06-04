import { CoreService } from '../../../../../core/core.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css'],
})
export class AddRolesComponent implements OnInit {
  RolesForm!: FormGroup;

  role: string[] = [
    'School Administrator',
    'School Director',
    'School Manager',
    'Principal',
    'School Accountant',
    'Chief Finance Officer',
    'School Bursar',
  ];

  Form: any;

  constructor(
    private _fb: FormBuilder,
    private _addRolesService: RolesService,
    private _dialogueRef: MatDialogRef<AddRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.RolesForm = this._fb.group({
      name: 0,
      description: '',
    });
  }

  ngOnInit(): void {
    console.log('fgjhgfgjhg', this.data);
    this.RolesForm.get('usergroup')?.patchValue(this.data.usergroup);
    this.RolesForm.patchValue(this.data);
  }

  onFormSubmit() {
    // Extracting only the date part from the date_of_birth field
    const dateOfBirth = this.RolesForm.get('date_of_birth')?.value;
    const dateOfBirthDate = new Date(dateOfBirth);
    dateOfBirthDate.setHours(0, 0, 0, 0); // Set time to midnight
    this.RolesForm.get('date_of_birth')?.setValue(
      dateOfBirthDate.toISOString().split('T')[0]
    );
    this.RolesForm.get('username')?.setValue(
      this.RolesForm.get('email')?.value
    );

    if (this.Form.valid) {
      console.log(this.data);
      if (this.data) {
        this._addRolesService
          .updateRoles(this.data.id, this.RolesForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('System user details updated!');
              this._dialogueRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._addRolesService.addRoles(this.RolesForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('System user added successfully! ☺');
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
