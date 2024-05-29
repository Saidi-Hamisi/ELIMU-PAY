import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup } from '@angular/forms';
  
  @Component({
  selector: 'app-pay-fees',
  templateUrl: './pay-fees.component.html',
  styleUrls: ['./pay-fees.component.css']
})
export class PayFeesComponent  {
    PayFeesForm: FormGroup;
    Category: string[] = ['Tution', 'Transport', 'Catering']; // Define an array of categories
  
    constructor(private _fb: FormBuilder) {
      this.PayFeesForm= this._fb.group({
        // Define your form controls here
      });
    }
  }
  



