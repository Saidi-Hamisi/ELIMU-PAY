// add-system-user.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { CoreService } from '../../../../../@Core/core/core.service';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-add-system-user',
  templateUrl: './add-system-user.component.html',
  styleUrls: ['./add-system-user.component.css'],
})
export class AddSystemUserComponent implements OnInit {
  SystemUserForm!: FormGroup;
  isLoading = false; // Add loading state

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
      usergroup: ['1233'],
      address: [''],
      nationality: [''],
      username: [''],
      schools: [null],
    });
  }

  ngOnInit(): void {
    // Fetch user groups
    console.log('12332', this.data);

    this._addSystemuserService.getUserGroupList().subscribe({
      next: (usergroups) => {
        this.usergroups = usergroups;
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
    const structuredData = {
      ...this.data,
      usergroup: this.data.roles[0],
      schools: this.data.school
    };
    console.log('data', structuredData);

    // Patch the rest of the form if there's initial data
    if (this.data) {
      this.SystemUserForm.patchValue(structuredData);
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
    formData.username = `${this.capitalize(
      formData.first_name
    )}.${this.capitalize(formData.last_name)}`;

    console.log('Form data:', formData); // Log formData before making API call

    // Show loading spinner
    this.isLoading = true;

    // Determine if it's an update or add operation
    if (this.data && this.data.id) {
      this._addSystemuserService
        .updateSystemUser(this.data.id, formData)
        .subscribe({
          next: (val: any) => {
            this.isLoading = false; // Hide loading spinner
            this._coreService.openSnackBar('System user details updated!');
            this._dialogueRef.close(true);
          },
          error: (err: any) => {
            this.isLoading = false; // Hide loading spinner
            console.error('Error updating user:', err);
          },
        });
    } else {
      this._addSystemuserService.addSystemUser(formData).subscribe({
        next: (val: any) => {
          this.isLoading = false; // Hide loading spinner
          Swal.fire(
            'User Created!',
            `${formData.first_name} ${formData.last_name} has been successfully created.`,
            'success'
          );
          this._dialogueRef.close(true);
        },
        error: (err: any) => {
          this.isLoading = false; // Hide loading spinner
          console.error('Error adding user:', err);
        },
      });
    }
  }
}
