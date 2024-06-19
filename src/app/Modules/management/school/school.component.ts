// school.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../../@Core/core/core.service';
import { SchoolService } from './school.service';
import { AddSchoolComponent } from './add-school/add-school.component';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'sub_county',
    'country',
    'country_code',
    'street_address',
    'email',
    'postal_code',
    'phone_number1',
    'phone_number2',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _schoolService: SchoolService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getSchoolList();
  }

  getSchoolList() {
    this._schoolService.getSchoolList().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error // Handle error appropriately
    });
  }

  openAddEditSchoolForm() {
    const dialogRef = this._dialog.open(AddSchoolComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSchoolList();
        }
      },
    });
  }

  deleteSchool(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this school?');
    if (confirmed) {
      this._schoolService.deleteSchool(id).subscribe({
        next: (res: any) => {
          this._coreService.openSnackBar('School deleted!', 'done');
          this.getSchoolList();
        },
        error: console.error // Handle error appropriately
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUpdateSchoolForm(data: any) {
    const dialogRef = this._dialog.open(AddSchoolComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSchoolList();
        }
      },
    });
  }
}
