import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/@Core/core/core.service';
import { AddSystemUserComponent } from '../../add-system-user/add-system-user.component';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
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
    'Parent',
  ];

  constructor(
    private _fb: FormBuilder,
    private _addSystemuserService: UserService,
    private _dialogueRef: MatDialogRef<AddSystemUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.RolesForm = this._fb.group({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      role: '',
      phoneNumber: '',
      address: '',
      nationality: '',
      school: '',
      idNumber: '',
    });
  }

  ngOnInit(): void {
    this.RolesForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.RolesForm.valid) {
      if (this.data) {
        this._addSystemuserService
          .updateSystemUser(this.data.id, this.RolesForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('One role updated!');
              this._dialogueRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._addSystemuserService
          .addSystemUser(this.RolesForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'One role added successfully! ☺'
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

