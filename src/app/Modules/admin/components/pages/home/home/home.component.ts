import { Component, OnInit } from "@angular/core";
import { HomecardsService } from "./homecards.service";
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog if you're using it for openDialog

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalIncomes: number = 0;
  totalExpenses: number = 0;
  totalSupplierAmount: number = 0;
  transactions: any[] = []; // Define transactions array
  showTransactionHistory: boolean = false; // Define showTransactionHistory property
  totalProfit: number = 0; // Define totalProfit property

  constructor(private homecardsService: HomecardsService, private dialog: MatDialog) { } // Inject MatDialog

  ngOnInit(): void {
    this.reloadData();
    this.fetchProfit();
  }

  reloadData() {
    // Fetch total incomes
    this.homecardsService.getTotalIncome().subscribe(
      (data: any) => {
        console.log('Total Incomes:', data);
        if (data && data['Fee Collection'] !== undefined) {
          this.totalIncomes = data['Fee Collection'];
        } else {
          console.error('Invalid API response format for Total Incomes.');
        }
      },
      (error: any) => {
        console.error('Error fetching total incomes:', error);
      }
    );

    // Fetch total expenses
    this.homecardsService.getTotalExpenses().subscribe(
      (data: any) => {
        console.log('Total Expenses:', data);
        if (data && data['Total Expenses'] !== undefined) {
          this.totalExpenses = data['Total Expenses'];
        } else {
          console.error('Invalid API response format for Total Expenses.');
        }
      },
      (error: any) => {
        console.error('Error fetching total expenses:', error);
      }
    );

    // Fetch total supplier amount
    this.homecardsService.getTotalSupplierAmount().subscribe(
      (data: any) => {
        console.log('supplier Collection:', data);
        if (data && data['supplier Collection'] !== undefined) {
          this.totalSupplierAmount = data['supplier Collection'];
        } else {
          console.error('Invalid API response format for Total Supplier Amount.');
        }
      },
      (error: any) => {
        console.error('Error fetching total supplier amount:', error);
      }
    );
  }

  fetchProfit() {
    // Fetch total profit
    this.homecardsService.getTotalProfit().subscribe(
      (data: any) => {
        console.log('Total Profit:', data);
        if (data && data['profit'] !== undefined) {
          this.totalProfit = data['profit'];
        } else {
          console.error('Invalid API response format for Total Profit.');
        }
      },
      (error: any) => {
        console.error('Error fetching total profit:', error);
      }
    );
  }

  toggleTransactionHistory() {
    this.showTransactionHistory = !this.showTransactionHistory;
  }

  openDialog() {
    // Implement your logic to open dialog here
  }
}
