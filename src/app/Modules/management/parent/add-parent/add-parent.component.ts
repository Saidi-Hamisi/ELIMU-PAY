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
  parentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private parentService: ParentService,
    private dialogRef: MatDialogRef<AddParentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
  ) {
    this.parentForm = this.fb.group({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.parentForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.parentForm.valid) {
      const formData = this.parentForm.value;

      if (this.data) {
        this.parentService.updateParent(this.data.id, formData).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Parent details updated!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this.parentService.addParent(formData).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Parent added successfully! ☺');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}