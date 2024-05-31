import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardMainComponent } from './components/Dashboard/dashboard-main/dashboard-main.component';
import { HomeComponent } from './components/pages/home/home/home.component';
import { SettingsComponent } from './components/pages/settings/settings/settings.component';
import { LoansComponent } from './components/pages/Account/expenses/loans/loans.component';
import { SalariesComponent } from './components/pages/Account/expenses/salaries/salaries.component';
// import { SuppliesComponent } from './components/pages/Account/expenses/supplies/supplies.component';
import { UtilitiesComponent } from './components/pages/Account/expenses/utilities/utilities.component';
import { FeeCollectionsComponent } from './components/pages/Account/income/fee-collections/fee-collections.component';
import { DonationsComponent } from './components/pages/Account/income/donations/donations.component';
import { GovernmentAllocationComponent } from './components/pages/Account/income/government-allocation/government-allocation.component';
import { SidebarAdminComponent } from './components/common-layout/sidebar-admin/sidebar-admin.component';
import { NavbarAdminComponent } from './components/common-layout/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from './components/common-layout/footer-admin/footer-admin.component';
import { ReportComponent } from './components/pages/Report/report/report.component';
import { GraphOneComponent } from './components/pages/home/home/graph-one/graph-one.component';
import { GraphTwoComponent } from './components/pages/home/home/graph-two/graph-two.component';
import { ChartsOfAccountsComponent } from './components/pages/Report/charts-of-accounts/charts-of-accounts.component';
import { ViewReportsComponent } from './components/pages/Report/view-reports/view-reports.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { ViewtranscationComponent } from './components/pages/Account/income/viewtranscation/viewtranscation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { AddIncomeComponent } from './components/pages/Account/income/add-income/add-income.component';
// import { ExpenseHomeComponent } from './components/pages/Account/expenses/expense-home/expense-home.component';
import { GraphThreeComponent } from './components/pages/home/graph-three/graph-three.component';
// import{MatMenuModule} from '@angular/material/menu'
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { IncomeTypesComponent } from './components/pages/Account/income/income-types/income-types.component';
import { AddIncomesComponent } from './components/pages/Account/income/income-types/add-incomes/add-incomes.component';
import { AddExpenseFormComponent } from './components/pages/Account/expenses/add-expense-form/add-expense-form.component';
import { AddEditComponent } from '../management/feecategory/add-edit/add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FeePaymentComponent } from './components/pages/Account/fee-payment/fee-payment.component';
import { PayFeeComponent } from './components/pages/Account/fee-payment/pay-fee/pay-fee.component';
import { PayFeesComponent } from './components/pages/Account/fee-payment/pay-fees/pay-fees.component';
import { FeeStatementComponent } from './components/pages/Account/fee-statement/fee-statement.component';
import { ExpensesComponent } from './components/pages/Account/expenses/expenses.component';
import { AddExpensesComponent } from './components/pages/Account/expenses/add-expenses/add-expenses.component';
import { SuppliesComponent } from './components/pages/Account/expenses/supplies/supplies.component';
import { AddSuppliesComponent } from './components/pages/Account/supplies/add-supplies/add-supplies.component';


@NgModule({
  declarations: [
    DashboardMainComponent,
    SidebarAdminComponent,
    NavbarAdminComponent,
    FooterAdminComponent,
    HomeComponent,
    SettingsComponent,
    LoansComponent,
    SalariesComponent,
    // SuppliesComponent,
    UtilitiesComponent,
    FeeCollectionsComponent,
    DonationsComponent,
    GovernmentAllocationComponent,
    ReportComponent,
    ViewtranscationComponent,
    GraphOneComponent,
    GraphTwoComponent,
    ChartsOfAccountsComponent,
    ViewReportsComponent,
    AddIncomeComponent,
    // ExpenseHomeComponent,
    GraphThreeComponent,
    IncomeTypesComponent,
    AddIncomesComponent,
    AddExpenseFormComponent,
    AddEditComponent,
    FeePaymentComponent,
    PayFeeComponent,
    PayFeesComponent,
    FeeStatementComponent,
    ExpensesComponent,
    AddExpensesComponent,
    SuppliesComponent,
    AddSuppliesComponent
    
    
    

    


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    HttpClientModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatProgressBarModule,
    ReactiveFormsModule,


    
  ],
  
  exports:[
    DashboardMainComponent,
    SidebarAdminComponent,
    NavbarAdminComponent,
    FooterAdminComponent,
    HomeComponent,
    SettingsComponent,
    // LoansComponent,
    // SalariesComponent,
    // SuppliesComponent,
    // UtilitiesComponent,
    FeeCollectionsComponent,
    // DonationsComponent,
    GovernmentAllocationComponent,
    ReportComponent,
    ViewtranscationComponent,
    ViewReportsComponent,
    ChartsOfAccountsComponent,
    


  



  ]
})
export class AdminModule{ }