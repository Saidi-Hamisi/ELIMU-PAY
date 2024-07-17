import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import * as XLSX from 'xlsx'; // Import xlsx library for Excel export
import { ViewtranscationComponent } from '../viewtranscation/viewtranscation.component';

interface Transaction {
  description: string;
  id: string;
  student__uniqueId: string;
  transaction_date: string;
  credit: number;
  debit: number;
  balance: number;
  // Add additional properties if necessary
}

@Component({
  selector: 'app-fee-collections',
  templateUrl: './fee-collections.component.html',
  styleUrls: ['./fee-collections.component.css']
})
export class FeeCollectionsComponent implements OnInit, AfterViewInit {
  totalFeeEndpoint = `${environment.apiUrl}payfee/calculate_total_fee/`;
  transactionsEndpoint = `${environment.apiUrl}payfee/api/v1/fee/list_transaction`;
  categoryTransactionsEndpoint = `${environment.apiUrl}fee/api/v1/fee/list_category_records`;

  displayedColumns: string[] = [
    'description',
    'id',
    'student__uniqueId',
    'transaction_date',
    'credit',
    'debit',
    'balance',
    'action'
  ];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  feeCollection: any;
  cards: any[] = [{ amount: '' }];
  transactions: Transaction[] = [];

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTotalFeeCollections();
    this.fetchTransactions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchTotalFeeCollections(): void {
    this.http.get<any>(this.totalFeeEndpoint).subscribe({
      next: (data) => {
        console.log('Total fee collection data:', data);
        this.feeCollection = data['Fee Collection'];
        this.cards[0].amount = `Ksh ${this.feeCollection}`;
      },
      error: (error) => {
        console.error('Error fetching total fee collections:', error);
      }
    });
  }

  fetchTransactions(): void {
    console.log('Fetching transactions from:', this.transactionsEndpoint);
    this.http.get<any>(this.transactionsEndpoint).subscribe({
      next: (data) => {
        console.log('Transactions data received:', data);
        this.transactions = data.entity;
        this.dataSource.data = this.transactions;
        console.log('DataSource data:', this.dataSource.data);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generatePdf(): void {
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
      html2canvas(tableContainer as HTMLElement).then((canvas) => {
        const doc = new jspdf('l', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 280;
        const pageHeight = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;
        const marginLeft = 5;
        const marginRight = 3;

        function addHeader() {
          doc.setFontSize(12);
          doc.text('Fee Category', imgWidth / 2, position, { align: 'center' });
          const now = new Date();
          const day = now.toLocaleDateString('en-US', { weekday: 'long' });
          const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
          const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          doc.setFontSize(6);
          doc.text(`Printed on ${day} ${date} at ${time}`, imgWidth - marginRight, position, { align: 'right' });
        }

        function addFooter() {
          doc.setFontSize(8);
          doc.text('Elimu Pay Technologies | Copyright © 2024 | All rights reserved.',
            imgWidth / 2,
            doc.internal.pageSize.getHeight() - 5,
            { align: 'center' }
          );
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

        doc.save('Fee Category Report.pdf');
      });
    } else {
      console.error('Fee Category reports not available');
    }
  }

  openDialog(transaction: Transaction): void {
    const dialogRef = this.dialog.open(ViewtranscationComponent, {
      width: '400px',
      data: transaction
    });

    dialogRef.afterClosed().subscribe(_result => {
      console.log('The dialog was closed');
    });
  }

  sortByLastDay(): void {
    const today = new Date();
    this.dataSource.data = this.dataSource.data.filter(row => {
      const rowDate = new Date(row.transaction_date);
      return rowDate.getFullYear() === today.getFullYear() &&
             rowDate.getMonth() === today.getMonth() &&
             rowDate.getDate() === today.getDate();
    });
  }

  sortByLastSevenDays(): void {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    this.dataSource.data = this.dataSource.data.filter(row => {
      const rowDate = new Date(row.transaction_date);
      return rowDate >= sevenDaysAgo && rowDate <= today;
    });
  }

  sortByLastThirtyDays(): void {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    this.dataSource.data = this.dataSource.data.filter(row => {
      const rowDate = new Date(row.transaction_date);
      return rowDate >= thirtyDaysAgo && rowDate <= today;
    });
  }

  generateExcel(): void {
    const fileName = 'Transaction_Report.xlsx';

    // Extract data for Excel
    const data = this.dataSource.data.map((row) => {
      return {
        'Transaction Details': row.description,
        'Payment Reference': row.id,
        'Unique ID': row.student__uniqueId,
        'Transaction Date': row.transaction_date,
        'Credit': row.credit,
        'Debit': row.debit,
        'Balance': row.balance
      };
    });

    // Convert to Excel worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    // Export to Excel file
    XLSX.writeFile(workbook, fileName);
  }
}
