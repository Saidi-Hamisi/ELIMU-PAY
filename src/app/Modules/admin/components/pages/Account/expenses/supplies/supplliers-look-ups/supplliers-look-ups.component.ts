// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-supplliers-look-ups',
//   templateUrl: './supplliers-look-ups.component.html',
//   styleUrls: ['./supplliers-look-ups.component.css']
// })
// export class SupplliersLookUpsComponent {

// }
import { takeUntil } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subject, Subscription } from "rxjs";
import { NotificationsService } from 'src/@Core/helpers/notifications.service';
import { MatPaginatorModule } from '@angular/material/paginator';

 @Component({
    selector: 'app-supplliers-look-ups',
    templateUrl: './supplliers-look-ups.component.html',
    styleUrls: ['./supplliers-look-ups.component.css']
  })
  export class SupplliersLookUpsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['index', 'acid', 'accountName', 'solCode', 'verifiedFlag'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any;
  error: any;
  employeeEmail: any;
  employee_id: any;
  creatingAccount = false;
  formData: any;
  respData: any;
  loading: boolean = false;
  acid: any;
  account_type = 'OAB';
  accountType: any;
  params: HttpParams = new HttpParams;
  destroy$: Subject<boolean> = new Subject<boolean>();
   accountsAPI: any;
row: any;
  constructor(
  
    private notificationAPI: NotificationsService,
    public dialogRef: MatDialogRef<SupplliersLookUpsComponent>
  ) { }
  ngOnInit() {
    this.getData();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  getData() {
    this.loading = true;
    this.accountType = this.account_type;
    this.params = new HttpParams().set('accountType', this.accountType);
    this.accountsAPI.getAccountsPerType(this.params).pipe(takeUntil(this.destroy$)).subscribe(
      {
        next: (
          (res: { statusCode: number; }) => {
            if (res.statusCode === 302) {
              this.loading = false;
              this.data = res;
              this.respData = this.data.entity;
              this.dataSource = new MatTableDataSource(this.respData);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            } else {
              this.loading = false;
            }
          }
        ),
        error: (
          (err: any) => {
            this.loading = false;
            this.notificationAPI.alertWarning("Server Error: !!");
          }
        ),
        complete: (
          () => {

          }
        )
      }
    ), Subscription;
  }
  onSelect(data: any) {
    this.dialogRef.close({ event: 'close', data: data });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
