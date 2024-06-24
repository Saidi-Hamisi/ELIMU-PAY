import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2'; 

import { AddSystemUserComponent } from './add-system-user/add-system-user.component';
import { UserService } from './user.service';
import { CoreService } from '../../../../@Core/core/core.service';

@Component({
  selector: 'app-sytem-users',
  templateUrl: './sytem-users.component.html',
  styleUrls: ['./sytem-users.component.css'],
})
export class SytemUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'roles',
    'email',
    'school_name',
    'address',
    'nationality',
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

  openAddEditSystemUserForm() {
    const dialogRef = this._dialog.open(AddSystemUserComponent);
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

        console.log(res);
        
        const a = res.entity.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
        this.dataSource = new MatTableDataSource(a);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error fetching user list:', err);
      },
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
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      text: 'You will not be able to recover this system user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this._addSystemUserService.deleteSystemUser(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('System user deleted!', 'done');
            this.getSystemUserList();
          },
          error: (err) => {
            console.error('Error deleting user:', err);
            Swal.fire('Error', 'There was an issue deleting the system user.', 'error');
          }
        });
      }
    });
  }

  openUpdateSystemUserForm(data: any) {
    const dialogRef = this._dialog.open(AddSystemUserComponent, {
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

  generatePdf() {
    const tableContainer = document.querySelector('.table-container');

    if (tableContainer) {
      html2canvas(tableContainer as HTMLElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });

        const imgWidth = 280;
        const pageHeight = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;
        const marginLeft = 5;
        const marginRight = 3;

        function addHeader() {
          doc.setFontSize(12);
          doc.text('System Users Report', imgWidth / 2, position, { align: 'center' });

          const now = new Date();
          const day = now.toLocaleDateString('en-US', { weekday: 'long' });
          const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
          const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

          doc.setFontSize(6);
          doc.text(`Printed on ${day} ${date} at ${time}`, imgWidth - marginRight, position, { align: 'right' });
        }

        function addFooter() {
          doc.setFontSize(8);
          doc.text('Elimu Pay Technologies | Copyright © 2024 | All rights reserved.', imgWidth / 2, doc.internal.pageSize.getHeight() - 5, { align: 'center' });
        }

        addHeader();
        addFooter();
        doc.addImage(imgData, 'PNG', marginLeft, position + 10, imgWidth - marginLeft - marginRight, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight + 10;
          doc.addPage();
          addHeader();
          addFooter();
          doc.addImage(imgData, 'PNG', marginLeft, position + 20, imgWidth - marginLeft - marginRight, imgHeight);
          heightLeft -= pageHeight;
        }

        doc.save('System Users Report.pdf');
      });
    } else {
      console.error('System users report container not found');
    }
  }

  generateExcel(): void {
    const fileName = 'System_Users_Report.xlsx';

    // Extract data for Excel
    const data = this.dataSource.data.map((row) => {
      return {
        'ID': row.id,
        'First Name': row.first_name,
        'Last Name': row.last_name,
        'Role': row.usergroup,
        'Email': row.email,
        'School': row.school_name,
        'Address': row.address,
        'Nationality': row.nationality,
      };
    });

    // Convert to Excel worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    // Export to Excel file
    XLSX.writeFile(workbook, fileName);
  }
}
