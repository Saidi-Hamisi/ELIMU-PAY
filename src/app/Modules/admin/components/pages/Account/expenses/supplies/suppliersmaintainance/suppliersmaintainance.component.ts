import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SupplliersLookUpsComponent } from '../supplliers-look-ups/supplliers-look-ups.component';
import { DataStoreService } from 'src/@Core/helpers/datastore.service';
import { NotificationsService } from 'src/@Core/helpers/notifications.service';

@Component({
  selector: 'app-suppliersmaintainance',
  templateUrl: './suppliersmaintainance.component.html',
  styleUrls: ['./suppliersmaintainance.component.css']
})


export class  SuppliersmaintainanceComponent implements OnInit {

  loading = false;
  submitted = false;
  account_code: any;
  functionArray: any;
  function_type: any;
  error: any;
  lookupData: any;
  acid: any;
  customerType: any;
  onShowSearch = true;
  showAccountCode = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private dataStoreApi: DataStoreService,
    private notificationAPI: NotificationsService
  )
   {
    this.functionArray = this.dataStoreApi.getActionsByPrivilege("ACCOUNTS MANAGEMENT");
    this.functionArray = this.functionArray.filter(
      (arr: string) =>
        arr === 'ADD' ||
        arr === 'DELETE' ||
        arr === 'INQUIRE' ||
        arr === 'MODIFY' ||
        arr === 'VERIFY' ||
        arr === 'REJECT' ||
        arr === 'STATEMENT');
  }
  formData = this.fb.group({
    function_type: ['', Validators.required],
    supplies: ['', Validators.required],
    account_type: [''],
    name:['']
  });
  ngOnInit(): void { }

  onChange(event: any) {
    this.function_type = event.target.value;
    if (event.target.value == "ADD") {
      this.onShowSearch = false;
      this.showAccountCode = false;
      // Assuming 'formData' is a FormGroup and it has a control named 'account_type'
      this.formData.setValue({
        account_type: "0000000000",
        function_type: null,
        supplies: null,
        name: null
      });
    }
    else if (event.target.value != "ADD") {
      this.onShowSearch = true;
    }
  }
  get f() {
    return this.formData.controls;
  }
  onSubmit() {
    this.loading = true;
    if (this.formData.valid) {
      this.router.navigate([''], { skipLocationChange: true, queryParams: { formData: this.formData.value, fetchedData: this.lookupData } });
    }
    else if (!this.formData.valid) {
      if (this.formData.controls.function_type.value == "") {
        this.loading = false;
        this.submitted = true;
        this.notificationAPI.alertWarning("CHOOSE Supplier FUNCTION");
      // } else if (this.formData.controls.accountN.value == "") {
      //   this.loading = false;
      //   this.submitted = true;
      //   this.notificationAPI.alertWarning("");
      // } else {
        this.loading = false;
        this.submitted = true;
        this.notificationAPI.alertWarning("OFFICE ACCOUNT DETAILS NOT ALLOWED");
      }
    }
  }
  SupplierLookup() {
    throw new Error('Method not implemented.');
    }
  // officeAccountLookup(): void {
  //   const dialogRef = this.dialog.open(SupplliersLookUpsComponent , {
  //     width: '45%',
  //     autoFocus: false,
  //     maxHeight: '90vh',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.lookupData = result.data;
  //     this.acid = this.lookupData.acid;
  //     this.customerType = this.lookupData.customerType;
  //     this.formData.controls.account_code.setValue(this.acid);
  //   });
  }

