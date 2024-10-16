import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { CoreService } from '../../../../../@Core/core/core.service';
import Swal from 'sweetalert2';
import { CountryService } from '../../financial-settings/fee-installment-plans/country.service'; // <-- Import the country service

@Component({
  selector: 'app-add-system-user',
  templateUrl: './add-system-user.component.html',
  styleUrls: ['./add-system-user.component.css'],
})
export class AddSystemUserComponent implements OnInit {
  SystemUserForm!: FormGroup;
  isLoading = false;
  countries: { name: string; code: string }[] = [];
  usergroups: { id: number; name: string }[] = [];

  constructor(
    private _fb: FormBuilder,
    private _addSystemuserService: UserService,
    private _dialogueRef: MatDialogRef<AddSystemUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private countryService: CountryService // <-- Injecting the country service
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
      nationality: [''], // <-- Form control for nationality
      username: [''],
    });
  }

  ngOnInit(): void {
    // Fetch user groups
    this._addSystemuserService.getUserGroupList().subscribe({
      next: (usergroups) => {
        this.usergroups = usergroups;
      },
      error: (err) => {
        console.error('Error fetching user groups:', err);
      },
    });

  
    // Fetch countries and sort alphabetically
    this.countryService.getCountries().subscribe({
      next: (data) => {
        // Map countries and sort alphabetically by name
        this.countries = data.map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
        })).sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
      },
    });

    // Patch the form if there's initial data
    if (this.data) {
      const structuredData = {
        ...this.data,
        usergroup: this.data.roles[0],
        schools: this.data.school,
      };
      this.SystemUserForm.patchValue(structuredData);
    }
  }

  onNationalityChange(event: any): void {
    this.SystemUserForm.get('nationality')?.setValue(event.target.value); // <-- Update form control with selected value
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

    // Show loading spinner
    this.isLoading = true;

    // Determine if it's an update or add operation
    if (this.data && this.data.id) {
      this._addSystemuserService.updateSystemUser(this.data.id, formData).subscribe({
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
