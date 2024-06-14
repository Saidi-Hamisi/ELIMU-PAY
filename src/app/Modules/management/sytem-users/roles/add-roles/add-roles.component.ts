import { CoreService } from '../../../../../core/core.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolesService } from '../roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css'],
})
export class AddRolesComponent implements OnInit {
  RolesForm!: FormGroup;
  loading: boolean = false;
  role: string = '';

  permissions: any[] = [];
  selectedPermissions: Set<number> = new Set<number>();

  constructor(
    private _fb: FormBuilder,
    private _addRolesService: RolesService,
    private _dialogueRef: MatDialogRef<AddRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.RolesForm = this._fb.group({
      name: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    console.log('Data:', this.data);
    if (this.data) {
      this.RolesForm.patchValue(this.data);
    }
    this.getSysPermissions();
  }

  getSysPermissions() {
    this._addRolesService.getAllPermissions().subscribe((res) => {
      console.log('123', res);
      this.permissions = res.entity;
    }),
    (error: any) => {
      console.log(error);
    };
  }

  onPermissionChange(event: Event, permissionId: number) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedPermissions.add(permissionId);
    } else {
      this.selectedPermissions.delete(permissionId);
    }
  }

  isChecked(permissionId: number): boolean {
    return this.selectedPermissions.has(permissionId);
  }

  onFormSubmit() {
    const formData = {
      ...this.RolesForm.value,
      permissions: Array.from(this.selectedPermissions), // Convert Set to Array
    };
    console.log('my data', formData);

    if (this.RolesForm.valid) {
      this.loading = true;
      this.role = formData.name; // Set role name for loading message
      if (this.data) {
        this._addRolesService
          .updateRoles(this.data.id, this.RolesForm.value)
          .subscribe({
            next: (val: any) => {
              this.loading = false;
              this._coreService.openSnackBar('System user details updated!');
              this._dialogueRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              this.loading = false;
            },
          });
      } else {
        this._addRolesService.addRoles(formData).subscribe({
          next: (val: any) => {
            this.loading = false;
            Swal.fire({
              icon: 'success',
              title: `${formData.name} has been created successfully!`,
            });
            this._dialogueRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this.loading = false;
          },
        });
      }
    }
  }
}
