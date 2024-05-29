import { CoreService } from '../../../../../@Core/core/core.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SchoolService } from '../school.service';
import { of } from 'rxjs';

@Component({
 selector: 'app-add-school',
 templateUrl: './add-school.component.html',
 styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {
 SchoolForm!: FormGroup;
 role: string[] = [
    'Pre-Primary',
    'Primary',
    'Secondary',
    'College',
    'University',
    'Other'
 ];
 countries: string[] = [
    'Kenya',
    'Tanzania',
    'Uganda',
    'Rwanda',
    'DRC',
    'South Sudan'
 ];
 countryCodes = ['KE', 'UG', 'TZ', 'RW', 'DRC', 'SS', 'ET'];

 constructor(
    private _fb: FormBuilder,
    private SchoolService: SchoolService,
    private _dialogueRef: MatDialogRef<AddSchoolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private CoreService: CoreService
 ) {
    this.SchoolForm = this._fb.group({
      name: '',
      city: '',
      county: '',
      country: '',
      Country_code: '',
      sub_county: '',
      email: '',
      school_type: '',
      date_created: '',
      boarding_status: '',
      postal_code:'',
      phone_number1:'',
      phone_number2:'',
    });
 }

 ngOnInit(): void {
    this.SchoolForm.patchValue(this.data);
    // Extracting only the date part from the date_of_birth field
    const dateOfBirth = this.SchoolForm.get('date_of_birth')?.value;
    if (dateOfBirth) {
      const dateCreated = new Date(dateOfBirth);
      dateCreated.setHours(0, 0, 0, 0); // Set time to midnight
      this.SchoolForm.get('date_created')?.setValue(dateCreated.toISOString().split('T')[0]);
    }
 }

 onFormSubmit() {
    // Assuming formValues contains a date property named 'date'
    let dateToConvert = this.SchoolForm.get('date_created')?.value;
   
    // Check if the date is valid
    if (dateToConvert && dateToConvert instanceof Date && !isNaN(dateToConvert.getTime())) {
       // Convert to ISO string if the date is valid
       let isoString = dateToConvert.toISOString();
       // Proceed with your logic using isoString
    } else {
       // Handle invalid date, e.g., set a default date or show an error
       console.error('Invalid date provided');
       // Optionally, set a default date or handle the error appropriately
    }

    if (this.SchoolForm.valid) {
      console.log(this.data);
      if (this.data) {
        this.SchoolService
          .updateSchool(this.data.id, this.SchoolForm.value)
          .subscribe({
            next: (val: any) => {
              this.CoreService.openSnackBar('School details updated!');
              this._dialogueRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.SchoolService
          .addSchool(this.SchoolForm.value)
          .subscribe({
            next: (val: any) => {
              this.CoreService.openSnackBar('School added successfully! ☺');
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
