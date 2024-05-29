// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component({
//   selector: 'app-pay-fee',
//   templateUrl: './pay-fee.component.html',
//   styleUrls: ['./pay-fee.component.css']
// })
// export class PayFeeComponent 
//  implements OnInit {
//   loading: boolean = false
//   form!: FormGroup

import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup } from '@angular/forms';
  
  @Component({
  selector: 'app-pay-fee',
  templateUrl: './pay-fee.component.html',
  styleUrls: ['./pay-fee.component.css']
})
export class PayFeeComponent  {
    PayFeeForm: FormGroup;
    Category: string[] = ['Tution', 'Transport', 'Catering']; // Define an array of categories
  
    constructor(private _fb: FormBuilder) {
      this.PayFeeForm= this._fb.group({
        // Define your form controls here
      });
    }
  }
  










//   constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {}
//   ngOnInit(): void {
//     this.form = this.initForm();
//   }

//   initForm(): FormGroup {
//     return this.fb.group({
//       name: ['', [Validators.required]],
//       description: ['', [Validators.required]],
//       status: ['', [Validators.required]]
//     })
//   }

//   submit(): void{
//     this.loading = true;

//   }

//   close(): void{}

//   get name() {
//     return this.form.get('name');
//   }

//   get description() {
//     return this.form.get('description');
//   }

//   get status() {
//     return this.form.get('status');
//   }
// }
