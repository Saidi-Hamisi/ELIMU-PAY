import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent {
  sidebarOpen: boolean = true
  toggleSidebar(): void {
    console.log("toggling")
    this.sidebarOpen = !this.sidebarOpen
  }

  onSidebarClosed(): void {
    this.sidebarOpen = false
  }
}
