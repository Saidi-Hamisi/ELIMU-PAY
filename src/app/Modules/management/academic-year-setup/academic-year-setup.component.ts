import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AcademicYearSetupService } from './academic-year-setup.service';
import { CoreService } from '../../../../@Core/core/core.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-academic-year-setup',
  templateUrl: './academic-year-setup.component.html',
  styleUrls: ['./academic-year-setup.component.css']
})
export class AcademicYearSetupComponent implements OnInit {

  academicYearForm!: FormGroup;
  displayedColumns: string[] = ['academic_year_name', 'start_date', 'end_date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _academicYearSetupService: AcademicYearSetupService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAcademicYearList();
  }

  initForm() {
    this.academicYearForm = this._formBuilder.group({
      academic_year_name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
  }

  getAcademicYearList() {
    this._academicYearSetupService.getAcademicYears().subscribe({
      next: (res: any) => {
        console.log('API Response:', res);

        if (res && Array.isArray(res)) {
          this.dataSource = new MatTableDataSource(res);
        } else {
          console.error('Invalid API response format.');
        }

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('An error occurred while fetching academic years:', err);
      }
    });
  }

  deleteAcademicYear(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this academic year?');
    if (confirmed) {
      this._academicYearSetupService.deleteAcademicYear(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Academic Year deleted!', 'done');
          this.getAcademicYearList();
        },
        error: (err) => {
          console.error('An error occurred while deleting academic year:', err);
        }
      });
    }
  }

  onSubmit() {
    if (this.academicYearForm.valid) {
      const formData = this.academicYearForm.value;
      this._academicYearSetupService.createAcademicYear(formData).subscribe({
        next: (res) => {
          console.log('Academic year created successfully:', res);
          this._coreService.openSnackBar('Academic Year created!', 'done');
          this.getAcademicYearList();
          this.academicYearForm.reset();
        },
        error: (err) => {
          console.error('An error occurred while creating academic year:', err);
        }
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

  openAddEditForm() {
    // Implement your logic for opening the add/edit form dialog
  }

  generatePdf() {
    // Implement PDF generation logic using html2canvas and jspdf
  }

}
