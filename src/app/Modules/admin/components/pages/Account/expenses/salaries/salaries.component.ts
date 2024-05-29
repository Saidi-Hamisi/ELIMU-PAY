import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router to handle redirection

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css']
})
export class SalariesComponent {

  shouldRedirectToLogin: boolean = true; // Define and initialize shouldRedirectToLogin as a property

  constructor(private router: Router) { 
    if (this.shouldRedirectToLogin) { // Use 'this' to reference class property
      // Optionally, you can conditionally perform navigation here
      // For example:
      // this.router.navigate(['/login']);
    }
  }

  redirectToLogin() {
    if (this.shouldRedirectToLogin) { // Use 'this' to reference class property
      this.router.navigate(['/login']);
    }
  }
}