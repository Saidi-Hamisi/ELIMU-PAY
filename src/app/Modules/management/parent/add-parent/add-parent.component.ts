import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { ParentService } from '../parent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent implements OnInit {

  parentForm: FormGroup;
  loading: boolean = false; // State to handle loading spinner

  constructor(
    private _fb: FormBuilder,
    private _parentService: ParentService,
    private _dialogRef: MatDialogRef<AddParentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.parentForm = this._fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      parentIdno: ''
    });
  }

  ngOnInit(): void {
    this.parentForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.parentForm.valid) {
      this.loading = true; // Show loading spinner

      const formData = this.parentForm.value;

      if (this.data) {
        this._parentService.updateParent(this.data.id, formData).subscribe({
          next: (val: any) => {
            this.loading = false; // Hide loading spinner
            Swal.fire({
              icon: 'success',
              title: 'Updated',
              text: `${formData.first_name} ${formData.last_name} has been successfully updated.`
            });
            this._coreService.openSnackbar('Parent details updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            this.loading = false; // Hide loading spinner
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to update parent details. Please try again.'
            });
            console.error(err);
          }
        });
      } else {
        this._parentService.addParent(formData).subscribe({
          next: (val: any) => {
            this.loading = false; // Hide loading spinner
            Swal.fire({
              icon: 'success',
              title: 'Created',
              text: `${formData.first_name} ${formData.last_name} has been successfully created.`
            });
            this._coreService.openSnackbar('Parent added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            this.loading = false; // Hide loading spinner
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to create parent. Please try again.'
            });
            console.error(err);
          }
        });
      }
    }
  }
}
