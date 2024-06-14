import { CoreService } from '../../../../../@Core/core/core.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-system-user',
  templateUrl: './add-system-user.component.html',
  styleUrls: ['./add-system-user.component.css'],
})
export class AddSystemUserComponent implements OnInit {
  SystemUserForm!: FormGroup;

  schools: { id: number; name: string }[] = [];
  usergroups: { id: number; name: string }[] = [];

  constructor(
    private _fb: FormBuilder,
    private _addSystemuserService: UserService,
    private _dialogueRef: MatDialogRef<AddSystemUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.SystemUserForm = this._fb.group({
      first_name: [''],
      middle_name: [''],
      last_name: [''],
      email: [''],
      date_of_birth: [''],
      gender: [''],
      usergroup: [null],
      address: [''],
      nationality: [''],
      username: [''],
      schools: [null],
    });
  }

  ngOnInit(): void {
    // Fetch user groups
    this._addSystemuserService.getUserGroupList().subscribe({
      next: (usergroups) => {
        this.usergroups = usergroups;
        // Patch the form only if `usergroup` exists in `data`
        this.SystemUserForm.get('usergroup')?.patchValue(
          this.data?.usergroup || null
        );
      },
      error: (err) => {
        console.error('Error fetching user groups:', err);
      },
    });

    // Fetch schools
    this._addSystemuserService.getSchoolList().subscribe({
      next: (schools) => {
        this.schools = schools;
        // Patch the form only if `school_id` exists in `data`
        this.SystemUserForm.get('school')?.patchValue(
          this.data?.school_id || null
        );
      },
      error: (err) => {
        console.error('Error fetching schools:', err);
      },
    });
    // Patch the rest of the form if there's initial data
    if (this.data) {
      this.SystemUserForm.patchValue(this.data);
    }
  }

  // Function to capitalize the first letter of a string
  capitalize(str: string): string {
    if (typeof str !== 'string' || str.length === 0) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  onFormSubmit() {
    console.log('Form submission initiated.');

    // Get the form value
    const formData = this.SystemUserForm.value;

    // Format the date_of_birth to 'yyyy-mm-dd'
    if (formData.date_of_birth) {
      const dob = new Date(formData.date_of_birth);
      const formattedDOB = dob.toISOString().split('T')[0];
      formData.date_of_birth = formattedDOB;
    }

    // Generate username
    formData.username = `${this.capitalize(formData.first_name)}.${this.capitalize(formData.last_name)}`;

    console.log('Form data:', formData); // Log formData before making API call

    // Determine if it's an update or add operation
    if (this.data && this.data.id) {
      this._addSystemuserService.updateSystemUser(this.data.id, formData).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('System user details updated!');
          this._dialogueRef.close(true);
        },
        error: (err: any) => {
          console.error('Error updating user:', err);
        },
      });
    } else {
      this._addSystemuserService.addSystemUser(formData).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('System user added successfully!');
          this._dialogueRef.close(true);
        },
        error: (err: any) => {
          console.error('Error adding user:', err);
        },
      });
    }
  }
}
