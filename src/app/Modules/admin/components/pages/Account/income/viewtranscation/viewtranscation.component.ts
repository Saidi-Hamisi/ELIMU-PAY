import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Transaction {
  id: number;
  student__uniqueId: number;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  transaction_date: string;
}

@Component({
  selector: 'app-viewtranscation',
  templateUrl: './viewtranscation.component.html',
  styleUrls: ['./viewtranscation.component.css']
})
export class ViewtranscationComponent implements OnInit {
  transactions: Transaction[];
  displayedColumns: string[] = ['id', 'student__uniqueId', 'description', 'debit', 'credit', 'balance', 'transaction_date'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { transactions: Transaction[] }) {
    this.transactions = data.transactions;
  }

  ngOnInit(): void {}
}
