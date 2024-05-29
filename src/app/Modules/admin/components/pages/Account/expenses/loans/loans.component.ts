import { Component } from '@angular/core';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent {
  currentPage = 1;

  // Function to handle page change
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    // Implement logic to load content for the clicked page
  }

  // Function to handle previous page
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      // Implement logic to load previous page
    }
  }

  // Function to handle next page
  onNextPage() {
    // Assuming 5 pages in total
    if (this.currentPage < 5) {
      this.currentPage++;
      // Implement logic to load next page
    }
  }
}
