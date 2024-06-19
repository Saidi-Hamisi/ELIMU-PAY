import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-preferences',
  templateUrl: './notification-preferences.component.html',
  styleUrls: ['./notification-preferences.component.css']
})
export class NotificationPreferencesComponent implements OnInit {
  
  emailPreferences = {
    allParents: false,
    feeBalances: false,
    customGroup: false
  };

  smsPreferences = {
    allParents: false,
    feeBalances: false,
    customGroup: false
  };

  constructor() { }

  ngOnInit(): void {
    // Initialize component
  }

  savePreferences() {
    // Logic to save preferences
    console.log('Email Preferences:', this.emailPreferences);
    console.log('SMS Preferences:', this.smsPreferences);
    // Add further logic as needed to update email and SMS templates based on preferences
  }
}
