import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { FeecategoryService } from './service/feecategory.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../../@Core/core/core.service';

@Component({
  selector: 'app-feecategory',
  templateUrl: './feecategory.component.html',
  styleUrls: ['./feecategory.component.css']
})
export class FeeCategoryComponent implements OnInit {
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
      this._feecategoryService.deleteFeeCategory(id).subscribe({
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
    dialogRef.afterClosed().subscribe((val: any) => {
      if (val) {
        this.getFeeCategoryList();
      }
    });
  }
  
}
