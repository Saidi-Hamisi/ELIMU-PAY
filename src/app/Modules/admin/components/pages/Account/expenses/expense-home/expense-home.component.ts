import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddExpenseFormComponent } from '../add-expense-form/add-expense-form.component';

@Component({
  selector: 'app-expense-home',
  templateUrl: './expense-home.component.html',
  styleUrls: ['./expense-home.component.css']
})
export class ExpenseHomeComponent implements OnInit{

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'select',
    'amount',
    'date',
    'actions'
  ]

  constructor(private dialog: MatDialog) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild("filter", { static: true }) filter!: ElementRef;

  ngOnInit(): void {
    
  }

  addExpense(): void {
    const dialog = this.dialog.open(AddExpenseFormComponent, {
      disableClose: false,
      autoFocus: true,
      width: '50%',
      data: {
        data: ""
      }
    });

    dialog.afterClosed().subscribe({
      next: () => {}
    })
  }
}
