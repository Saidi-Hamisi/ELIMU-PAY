import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {PayFeeComponent } from './pay-fee/pay-fee.component';


@Component({
  selector: 'app-fee-payment',
  templateUrl: './fee-payment.component.html',
  styleUrls: ['./fee-payment.component.css']
})
export class FeePaymentComponent  {
  constructor(private _dialog: MatDialog){}
  
  openPayFeeForm(){
    this._dialog.open(PayFeeComponent);


        
  }
}
