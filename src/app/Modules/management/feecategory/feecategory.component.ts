import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { FeecategoryService } from './service/feecategory.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../../@Core/core/core.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-feecategory',
  templateUrl: './feecategory.component.html',
  styleUrls: ['./feecategory.component.css']
})
export class FeeCategoryComponent implements OnInit {

  generatePdf() {
    // Get the table-container div
    const tableContainer = document.querySelector('.table-container');

    // Check if the table-container div exists
    if (tableContainer) {
        // Convert the content of table-container to a canvas
        html2canvas(tableContainer as HTMLElement).then((canvas) => {
            // Convert canvas to PDF using jsPDF with landscape orientation
            const doc = new jspdf('l', 'mm', 'a4'); // 'l' for landscape
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 280; // Adjusted A4 width in mm with margins
            const pageHeight = 210; // A4 height in mm (landscape orientation)
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 10; // Adjust margin top here
            const marginLeft = 5; // Adjust left margin
            const marginRight = 3; // Adjust right margin

            function addHeader() {
                doc.setFontSize(12);
                doc.text('Fee Category', imgWidth / 2, position, { align: 'center' }); // Header text position

                // Get current date and time
                const now = new Date();
                const day = now.toLocaleDateString('en-US', { weekday: 'long' }); // Get the full name of the day
                const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
                const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

                // Add printed date and time
                doc.setFontSize(6);
                doc.text(`Printed on ${day} ${date} at ${time}`, imgWidth - marginRight, position, { align: 'right' });
            }

            function addFooter() {
                doc.setFontSize(8);
                doc.text('Elimu Pay Technologies | Copyright © 2024 | All rights reserved.',
                    imgWidth / 2, // X position (center)
                    doc.internal.pageSize.getHeight() - 5, // Y position (5mm from bottom)
                    { align: 'center' }
                );
            }

            addHeader(); // Add header to the first page
            addFooter(); // Add footer to the first page

            doc.addImage(imgData, 'PNG', marginLeft, position + 10, imgWidth - marginLeft - marginRight, imgHeight); // Adjust position to make space for header and printed date/time
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight + 10; // Adjust margin top here
                doc.addPage();
                addHeader(); // Add header to subsequent pages
                addFooter(); // Add footer to subsequent pages
                doc.addImage(imgData, 'PNG', marginLeft, position + 20, imgWidth - marginLeft - marginRight, imgHeight); // Adjust position to make space for header and printed date/time
                heightLeft -= pageHeight;
            }

            // Save the PDF
            doc.save('Fee Category Report.pdf');
        });
    } else {
        console.error('Fee Category reports not available');
    }
}





  displayedColumns: string[] = [
    'id',
    'name', 
     'categorycode', 
    'description', 
    'grade', 
    'term', 
    'amount',
    // 'apply',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _feecategoryService: FeecategoryService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getFeeCategoryList();
  }

  getFeeCategoryList() {
    this._feecategoryService.getFeecategoryList().subscribe({
      next: (res: any) => {
        console.log('API Response:', res); // Log the API response for debugging
  
        // Check if the response contains 'entity' and it is an array
        if (res && Array.isArray(res.entity)) {
          this.dataSource = new MatTableDataSource(res.entity);
        } else {
          console.error('Invalid API response format.');
          // Handle error appropriately (e.g., show error message)
        }
  
        // Assign paginator and sort to the dataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('An error occurred while fetching fee categories:', err);
        // Handle error appropriately (e.g., show error message)
      }
    });
  }

  deleteFeeCategory(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this fee category?');
    if (confirmed) {
      this._feecategoryService.deleteFeecategory(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Fee Category deleted!', 'done');
          this.getFeeCategoryList();
        },
        error: (err) => {
          console.error('An error occurred while deleting fee category:', err);
          // Handle error appropriately (e.g., show error message)
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
    const dialogRef = this._dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val)  => {
    
      if (val) {
        this.getFeeCategoryList();
      }
    } 
    });
  }
  

  openUpdateAddEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFeeCategoryList();
        }
      },
    });
  }
}
