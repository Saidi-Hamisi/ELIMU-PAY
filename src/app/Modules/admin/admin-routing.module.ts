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
import { GraphOneComponent } from './components/pages/home/home/graph-one/graph-one.component';
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
import { StudentReportComponent } from './components/pages/Report/student-report/student-report.component';
import { SuppliesComponent } from './components/pages/Account/supplies/supplies.component';
import { SchoolManagementComponent } from '../management/school-management/school-management.component';
import { BrandingAndAppearanceComponent } from '../management/school-management/branding-and-appearance/branding-and-appearance.component';
import { DataManagementComponent } from '../management/data-management/data-management.component';
import { UserDirectoryComponent } from '../management/data-management/user-directory/user-directory.component';
import { BulkUploadComponent } from '../management/data-management/bulk-upload/bulk-upload.component';
import { FinancialSettingsComponent } from '../management/financial-settings/financial-settings.component';
import { SystemSettingsComponent } from '../management/system-settings/system-settings.component';
import { CommunicationSettingsComponent } from '../management/communication-settings/communication-settings.component';
import { EmailAndSmsTemplatesComponent } from '../management/communication-settings/email-and-sms-templates/email-and-sms-templates.component';
import { NotificationPreferencesComponent } from '../management/communication-settings/notification-preferences/notification-preferences.component';
import { FeeStructureSetupComponent } from '../management/financial-settings/fee-structure-setup/fee-structure-setup.component';
import { FeeInstallmentPlansComponent } from '../management/financial-settings/fee-installment-plans/fee-installment-plans.component';
import { IntergrationsComponent } from '../management/system-settings/intergrations/intergrations.component';
import { TimeZoneAndLanguageComponent } from '../management/system-settings/time-zone-and-language/time-zone-and-language.component';

import { AcademicYearSetupComponent } from '../management/academic-year-setup/academic-year-setup.component';
import { GradeSectionSetupComponent } from '../management/grade-and-section-setup/grade-and-section-setup.component';



const routes: Routes = [
  {
    path: '',component: DashboardMainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent,       },
      { path: 'settings', component: SettingsComponent },
      { path: 'reports', component: ReportComponent },
      { path: 'studentReport', component: StudentReportComponent },
      { path: 'loans', component: LoansComponent },
      { path: 'salaries', component: SalariesComponent },
      { path: 'supplies', component: SuppliesComponent },
      { path: 'utilities', component: UtilitiesComponent },
      { path: 'donations', component: DonationsComponent },
      { path: 'feeCollections', component: FeeCollectionsComponent },
      { path: 'graphonecomponent', component: GraphOneComponent},
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
      { path: 'school-management', component: SchoolManagementComponent},
      { path: 'branding-and-appearance', component: BrandingAndAppearanceComponent},
      { path: 'data-management', component: DataManagementComponent},
      { path: 'user-directory', component: UserDirectoryComponent},
      { path: 'bulk-upload', component: BulkUploadComponent},
      { path: 'financial-settings', component: FinancialSettingsComponent},
      { path: 'system-settings', component: SystemSettingsComponent},
      { path: 'communication-settings', component: CommunicationSettingsComponent},
      { path: 'email-and-sms-templates', component:EmailAndSmsTemplatesComponent},
      { path: 'notification-preferences', component:NotificationPreferencesComponent},
      { path: 'fee-structure-setup', component:FeeStructureSetupComponent},
      { path: 'fee-installment-plans', component:FeeInstallmentPlansComponent},
      { path: 'time-zone-and-language', component:TimeZoneAndLanguageComponent},
      { path: 'intergrations', component:IntergrationsComponent},
      { path: 'grade-section-setup', component: GradeSectionSetupComponent},
      { path: 'academic-year-setup', component:AcademicYearSetupComponent},

     



      


      













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
