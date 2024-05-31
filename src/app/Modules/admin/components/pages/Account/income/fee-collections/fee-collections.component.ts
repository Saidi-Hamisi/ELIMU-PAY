import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { ViewtranscationComponent } from '../viewtranscation/viewtranscation.component';

interface Transaction {
  id: number;
  student__uniqueId: number;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  transaction_date: string;
}

interface Card {
  icon: string;
  title: string;
  amount: string;
}

@Component({
  selector: 'app-fee-collections',
  templateUrl: './fee-collections.component.html',
  styleUrls: ['./fee-collections.component.css']
})
export class FeeCollectionsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  faBullhorn = faBullhorn;
  feeCollection: number = 0;
  selectedDateFilterOption: string = 'Last 30 days';
  searchTerm: string = '';
  dropdownOpen: boolean = false;

  totalFeeEndpoint = 'http://192.168.90.64:8000/api/v1/payfee/calculate_total_fee/';
  transactionsEndpoint = 'http://192.168.89.139:8000/api/v1/payfee/api/v1/fee/list_transaction';

  cards: Card[] = [{ icon: '', title: 'Total Fee Collection', amount: '' }];

  constructor(private router: Router, private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() {
    this.fetchTotalFeeCollections();
    this.fetchTransactions();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  fetchTotalFeeCollections() {
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

  fetchTransactions() {
    this.http.get<any>(this.transactionsEndpoint).subscribe({
      next: (response) => {
        console.log('Transactions data:', response);
        this.transactions = response.entity;
        this.filteredTransactions = [...this.transactions];
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  sortTransactions(criteria: string) {
    this.selectedDateFilterOption = criteria.replace('last', 'Last ');

    const now = new Date();

    switch (criteria) {
      case 'lastDay':
        this.filteredTransactions = this.transactions.filter(transaction => {
          const transactionDate = new Date(transaction.transaction_date);
          const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          return transactionDate >= oneDayAgo;
        });
        break;
      case 'last7Days':
        this.filteredTransactions = this.transactions.filter(transaction => {
          const transactionDate = new Date(transaction.transaction_date);
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return transactionDate >= sevenDaysAgo;
        });
        break;
      case 'last30Days':
        this.filteredTransactions = this.transactions.filter(transaction => {
          const transactionDate = new Date(transaction.transaction_date);
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return transactionDate >= thirtyDaysAgo;
        });
        break;
      case 'lastMonth':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        this.filteredTransactions = this.transactions.filter(transaction => {
          const transactionDate = new Date(transaction.transaction_date);
          return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
        });
        break;
      default:
        this.filteredTransactions = [...this.transactions];
    }
  }

  openDialog(transaction: Transaction) {
    const dialogRef = this.dialog.open(ViewtranscationComponent, {
      width: '400px',
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredTransactions = this.transactions.filter(transaction =>
      transaction.description.toLowerCase().includes(filterValue) ||
      transaction.student__uniqueId.toString().includes(filterValue) ||
      transaction.transaction_date.toLowerCase().includes(filterValue) ||
      transaction.credit.toString().includes(filterValue) ||
      transaction.debit.toString().includes(filterValue)
    );

    if (this.filteredTransactions.length === 0) {
      this.filteredTransactions = [...this.transactions]; // Reset to all transactions if no match is found
    }
  }
}
