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
  selectedDateFilterOption: string = ''; // Here's the new declaration
  searchTerm: string = '';

  totalFeeEndpoint = 'http://192.168.90.64:8000/api/v1/payfee/calculate_total_fee/';
  transactionsEndpoint = 'http://192.168.90.64:8000/api/v1/payfee/api/v1/fee/list_transaction';

  cards: Card[] = [{ icon: '', title: 'Total Fee Collection', amount: '' }];

  constructor(private router: Router, private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() {
    this.fetchTotalFeeCollections();
    this.fetchTransactions();
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

  applyFilter(selectedValue: string) {
    this.selectedDateFilterOption = selectedValue;
    this.filteredTransactions = [...this.transactions]; // Reset filter
    if (this.selectedDateFilterOption === 'Last 10 Days') {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        new Date(transaction.transaction_date) >= new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000)
      );
    } else if (this.selectedDateFilterOption === 'This Month') {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Set to start of current month
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        new Date(transaction.transaction_date) >= startOfMonth
      );
    }
    this.applySearch(); // Apply search after filtering
  }

  applySearch() {
    if (this.searchTerm.trim() !== '') {
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        transaction.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  viewTransaction(transactionId: number) {
    this.router.navigate(['/transaction', transactionId]);
  }

  openDialog() {
    this.dialog.open(ViewtranscationComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      height: '80%',
      data: {
        transactions: this.filteredTransactions // Pass filtered transactions to dialog
      }
    });
  }
}
