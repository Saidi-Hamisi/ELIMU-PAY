import { RolesComponent } from './../management/sytem-users/roles/roles.component';
import { ViewReportsComponent } from './components/pages/Report/view-reports/view-reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainComponent } from './components/Dashboard/dashboard-main/dashboard-main.component';
import { HomeComponent } from './components/pages/home/home/home.component';
import { SettingsComponent } from './components/pages/settings/settings/settings.component';
import { ReportComponent } from './components/pages/Report/report/report.component';
import { LoansComponent } from './components/pages/Account/expenses/loans/loans.component';
import { SalariesComponent } from './components/pages/Account/expenses/salaries/salaries.component';
// import { SuppliesComponent } from './components/pages/Account/expenses/supplies/supplies.component';
import { UtilitiesComponent } from './components/pages/Account/expenses/utilities/utilities.component';
import { DonationsComponent } from './components/pages/Account/income/donations/donations.component';
import { FeeCollectionsComponent } from './components/pages/Account/income/fee-collections/fee-collections.component';
import { GovernmentAllocationComponent } from './components/pages/Account/income/government-allocation/government-allocation.component';
import { ChartsOfAccountsComponent } from './components/pages/Report/charts-of-accounts/charts-of-accounts.component';

import { StaffComponent } from '../management/staff/staff.component';
import { StudentComponent } from '../management/student/student.component';
import { FeeCategoryComponent } from '../management/feecategory/feecategory.component';
// import { SuppliesComponent } from './components/pages/Account/expenses/supplies/supplies.component';



import { ViewtranscationComponent } from './components/pages/Account/income/viewtranscation/viewtranscation.component';
import { SytemUsersComponent } from '../management/sytem-users/sytem-users.component';
import { IncomeTypesComponent } from './components/pages/Account/income/income-types/income-types.component';
import { ExpensesComponent } from './components/pages/Account/expenses/expenses.component';
import { SchoolComponent} from '../management/school/school.component';
import { FeePaymentComponent } from './components/pages/Account/fee-payment/fee-payment.component';
import { FeeStatementComponent } from './components/pages/Account/fee-statement/fee-statement.component';
import { ParentComponent } from '../management/parent/parent.component';
import { DeleteConfirmationComponent } from '../management/student/delete-confirmation/delete-confirmation.component';


const routes: Routes = [
  {
    path: '',component: DashboardMainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'reports', component: ReportComponent },
      { path: 'loans', component: LoansComponent },
      { path: 'salaries', component: SalariesComponent },
      // { path: 'supplies', component: SuppliesComponent },
      { path: 'utilities', component: UtilitiesComponent },
      { path: 'donations', component: DonationsComponent },
      { path: 'feeCollections', component: FeeCollectionsComponent },
      { path: 'feecategory', component: FeeCategoryComponent },
      
      {
        path: 'governmentAllocations',
        component: GovernmentAllocationComponent,
      },
      { path: 'trasactions', component: ViewtranscationComponent },
      // { path: 'supplies', component: SuppliesComponent},

      { path: 'student', component: StudentComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'roles', component: RolesComponent },

      { path: 'ChartsOfAccounts', component: ChartsOfAccountsComponent },
      { path: 'viewreports', component: ViewReportsComponent },
      { path: 'feePayments', component: FeePaymentComponent },
      { path: 'SystemUsers', component: SytemUsersComponent },
      { path: 'school', component: SchoolComponent },
      { path: 'Incometypes', component: IncomeTypesComponent },
      { path: 'FeeStatement', component: FeeStatementComponent },
      { path: 'parent', component: ParentComponent},
      { path: 'delete-confirmation', component: DeleteConfirmationComponent},


      // expenses
      {path: 'expenses', component: ExpensesComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
