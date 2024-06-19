import { Component } from '@angular/core';

@Component({
  selector: 'app-email-and-sms-templates',
  templateUrl: './email-and-sms-templates.component.html',
  styleUrls: ['./email-and-sms-templates.component.css']
})
export class EmailAndSmsTemplatesComponent {
  recipientName: string = "Parent";
  dueDate: string = "2024-06-30";
  amountDue: number = 500;

  constructor() { }

  useEmailTemplate(): void {
    const emailContent = `
      Dear ${this.recipientName},
      
      This is a friendly reminder that the payment for the upcoming term is due on ${this.dueDate}.
      
      Please make sure to settle the outstanding amount of ${this.amountDue} at your earliest convenience.
      
      Thank you for your prompt attention to this matter.
      
      Sincerely,
      Your School Name
    `;
    
    console.log("Email Content:", emailContent);
    // Logic to send email content (integrate with backend service)
  }

  useSMSTemplate(): void {
    const smsContent = `
      Dear ${this.recipientName},
      
      Payment for ${this.dueDate} is due soon. Please ensure payment of ${this.amountDue} at your earliest convenience.
      
      Thank you,
      Your School Name
    `;
    
    console.log("SMS Content:", smsContent);
    // Logic to send SMS content (integrate with backend service)
  }

  addTemplate(): void {
    // Logic to add a new template (if required)
    console.log("Add Template clicked");
  }
}
