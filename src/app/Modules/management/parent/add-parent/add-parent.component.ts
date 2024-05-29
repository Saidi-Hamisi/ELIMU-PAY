import { CoreService } from '../../../../../@Core/core/core.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParentService } from '../parent.service';

@Component({
  selector: 'app-add-system-user',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.css'],
})
export class AddParentComponent implements OnInit {
  SystemUserForm!: FormGroup;

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
schools: string[] = [
  'Bahati Girls High school',
  'Cherngani High School'
];
  ParentForm: any;


  constructor(
    private _fb: FormBuilder,
    private _addParentService: ParentService,
    private _dialogueRef: MatDialogRef<AddParentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.ParentForm = this._fb.group({
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      date_of_birth: '',
      gender: '',
      usergroup: 0,
      // phoneNumber: '',
      address: '',
      nationality: '',
      schools: 0,
      // idNumber: '',
      username:'',
    });
  }

  ngOnInit(): void {
    console.log("fgjhgfgjhg", this.data)
    this.SystemUserForm.get('usergroup')?.patchValue(this.data.usergroup)
    this.SystemUserForm.get('schools')?.setValue(this.data.school_name)
    this.SystemUserForm.patchValue(this.data);        
  }

  onFormSubmit() {

        // Extracting only the date part from the date_of_birth field
        const dateOfBirth = this.SystemUserForm.get('date_of_birth')?.value;
        const dateOfBirthDate = new Date(dateOfBirth);
        dateOfBirthDate.setHours(0, 0, 0, 0); // Set time to midnight
        this.SystemUserForm.get('date_of_birth')?.setValue(dateOfBirthDate.toISOString().split('T')[0]);
        this.SystemUserForm.get('username')?.setValue(this.SystemUserForm.get('email')?.value)
    
    if (this.SystemUserForm.valid) {
console.log(this.data)
      if (this.data) {
        this._addParentService
          .updateParent(this.data.id, this.SystemUserForm.value)
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

        this._addParentService
          .addParent(this.SystemUserForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'System user added successfully! ☺'
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
