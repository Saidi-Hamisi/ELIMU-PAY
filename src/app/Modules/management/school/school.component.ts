import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../../@Core/core/core.service';
import { SchoolService } from './school.service';
import { AddSchoolComponent } from './add-school/add-school.component';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'city',
    'county',
    'sub_county',
    'country',
    'country_code',
    'street_address',
     'email',
    'school_type',
    'date_created ',
    'boarding_status',
    'postal_code',
    'phone_number1',
    'phone_number2',
    'action',
    // 'phoneNumber',
    // 'idNumber',
    //  'nationality',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private _dialog: MatDialog,
    private _SchoolService: SchoolService,
    // private _SchoolService: SchoolService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getSchoolList();
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
    // setTimeout(() => {
    //   const formElement = document.querySelector('.mat-form-field');
    //   if (formElement) {
    //     formElement.dispatchEvent(new Event('click'));
    //   }
    // }, 100);
  }

  getSchoolList() {
    this._SchoolService.getSchoolList().subscribe({
      next: (res: any) => {
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
  deleteSchool(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this school?');
    if (confirmed) {
      this._SchoolService.deleteSchool(id).subscribe({
        next: (res: any) => {
          this._coreService.openSnackBar('School deleted!', 'done');
          this.getSchoolList();
        },
        error: console.error, // Handle error appropriately
      });
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





