import { Component, OnInit, ViewChild } from '@angular/core';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/@Core/core/core.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    // 'firstName',
    // 'middleName',
    // 'lastName',
    'role',
    // 'phoneNumber',
    // 'email',
    // 'idNumber',
    // 'gender',
    'dob',
    // 'school',
    // 'address',
    // 'nationality',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _addSystemUserService: UserService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getSystemUserList();
  }

  openAddEditRolesForm() {
    const dialogRef = this._dialog.open(AddRolesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSystemUserList();
        }
      },
    });
  }

  getSystemUserList() {
    this._addSystemUserService.getSystemUserList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteSystemUser(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this role?');
    if (confirmed) {
      this._addSystemUserService.deleteSystemUser(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('One role deleted!', 'done');
          this.getSystemUserList();
        },
        error: console.error, 
      });
    }
  }
  

  openUpdateSystemUserForm(data: any) {
    const dialogRef = this._dialog.open(AddRolesComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSystemUserList();
        }
      },
    });
  }
}
