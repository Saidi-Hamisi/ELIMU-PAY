import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../../@Core/core/guards/auth.guard'; // Adjust path as per your structure

import { DashboardMainComponent } from './components/Dashboard/dashboard-main/dashboard-main.component';
import { HomeComponent } from './components/pages/home/home/home.component';
import { SettingsComponent } from './components/pages/settings/settings/settings.component';
import { ReportComponent } from './components/pages/Report/report/report.component';
import { StudentReportComponent } from './components/pages/Report/student-report/student-report.component';
import { LoansComponent } from './components/pages/Account/expenses/loans/loans.component';
import { SalariesComponent } from './components/pages/Account/expenses/salaries/salaries.component';
import { SuppliesComponent } from './components/pages/Account/supplies/supplies.component'; // Example of a dynamically shown component
import { UtilitiesComponent } from './components/pages/Account/expenses/utilities/utilities.component';
import { DonationsComponent } from './components/pages/Account/income/donations/donations.component';
import { GraphOneComponent } from './components/pages/home/home/graph-one/graph-one.component';
import { FeeCollectionsComponent } from './components/pages/Account/income/fee-collections/fee-collections.component';
import { GovernmentAllocationComponent } from './components/pages/Account/income/government-allocation/government-allocation.component';
import { FeeCategoryComponent } from '../management/feecategory/feecategory.component'; // Example of a static role-based component

import { ViewtranscationComponent } from './components/pages/Account/income/viewtranscation/viewtranscation.component';
import { SytemUsersComponent } from '../management/sytem-users/sytem-users.component'; // Example of a static role-based component
import { IncomeTypesComponent } from './components/pages/Account/income/income-types/income-types.component';
import { FeePaymentComponent } from './components/pages/Account/fee-payment/fee-payment.component';
import { FeeStatementComponent } from './components/pages/Account/fee-statement/fee-statement.component';
import { ParentComponent } from '../management/parent/parent.component'; // Example of a static role-based component
import { DeleteConfirmationComponent } from '../management/student/delete-confirmation/delete-confirmation.component'; // Example of a static role-based component
import { SchoolManagementComponent } from '../management/school-management/school-management.component'; // Example of a static role-based component
import { BrandingAndAppearanceComponent } from '../management/school-management/branding-and-appearance/branding-and-appearance.component'; // Example of a static role-based component
import { DataManagementComponent } from '../management/data-management/data-management.component'; // Example of a static role-based component
import { UserDirectoryComponent } from '../management/data-management/user-directory/user-directory.component'; // Example of a static role-based component
import { BulkUploadComponent } from '../management/data-management/bulk-upload/bulk-upload.component'; // Example of a static role-based component
import { FinancialSettingsComponent } from '../management/financial-settings/financial-settings.component'; // Example of a static role-based component
import { SystemSettingsComponent } from '../management/system-settings/system-settings.component'; // Example of a static role-based component
import { CommunicationSettingsComponent } from '../management/communication-settings/communication-settings.component'; // Example of a static role-based component
import { EmailAndSmsTemplatesComponent } from '../management/communication-settings/email-and-sms-templates/email-and-sms-templates.component'; // Example of a static role-based component
import { NotificationPreferencesComponent } from '../management/communication-settings/notification-preferences/notification-preferences.component'; // Example of a static role-based component
import { FeeStructureSetupComponent } from '../management/financial-settings/fee-structure-setup/fee-structure-setup.component'; // Example of a static role-based component
import { FeeInstallmentPlansComponent } from '../management/financial-settings/fee-installment-plans/fee-installment-plans.component'; // Example of a static role-based component
import { IntergrationsComponent } from '../management/system-settings/intergrations/intergrations.component'; // Example of a static role-based component
import { TimeZoneAndLanguageComponent } from '../management/system-settings/time-zone-and-language/time-zone-and-language.component'; // Example of a static role-based component
import { AcademicYearSetupComponent } from '../management/academic-year-setup/academic-year-setup.component'; // Example of a static role-based component
import { GradeSectionSetupComponent } from '../management/grade-and-section-setup/grade-and-section-setup.component'; // Example of a static role-based component
import { StudentComponent } from '../management/student/student.component';
import { StaffComponent } from '../management/staff/staff.component';
import { RolesComponent } from '../management/sytem-users/roles/roles.component';
import { ChartsOfAccountsComponent } from './components/pages/Report/charts-of-accounts/charts-of-accounts.component';
import { ViewReportsComponent } from './components/pages/Report/view-reports/view-reports.component';
import { SchoolComponent } from '../management/school/school.component';
import { ExpensesComponent } from './components/pages/Account/expenses/expenses.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardMainComponent,
    canActivate: [AuthGuard], // Apply AuthGuard to protect child routes
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'settings', component: SettingsComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'reports', component: ReportComponent, data: { roles: ['admin', 'user'] } }, // Example of a route with static role-based access
      { path: 'studentReport', component: StudentReportComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'loans', component: LoansComponent, data: { roles: ['finance'] } }, // Example of a route with static role-based access
      { path: 'salaries', component: SalariesComponent, data: { roles: ['hr'] } }, // Example of a route with static role-based access
      { path: 'supplies', component: SuppliesComponent, data: { roles: ['admin'] } }, // Example of a route with dynamically shown component
      { path: 'utilities', component: UtilitiesComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'donations', component: DonationsComponent, data: { roles: ['finance'] } }, // Example of a route with static role-based access
      { path: 'feeCollections', component: FeeCollectionsComponent, data: { roles: ['finance'] } }, // Example of a route with static role-based access
      { path: 'graphonecomponent', component: GraphOneComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'feecategory', component: FeeCategoryComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access

      {
        path: 'governmentAllocations',
        component: GovernmentAllocationComponent,
        data: { roles: ['finance'] } // Example of a route with static role-based access
      },
      { path: 'trasactions', component: ViewtranscationComponent, data: { roles: ['finance'] } }, // Example of a route with static role-based access

      // Management routes
      { path: 'student', component: StudentComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'staff', component: StaffComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'roles', component: RolesComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access

      // Reports
      { path: 'ChartsOfAccounts', component: ChartsOfAccountsComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'viewreports', component: ViewReportsComponent, data: { roles: ['admin', 'user'] } }, // Example of a route with static role-based access

      // Account routes
      { path: 'feePayments', component: FeePaymentComponent, data: { roles: ['finance'] } }, // Example of a route with static role-based access

      // System users
      { path: 'SystemUsers', component: SytemUsersComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access

      // School management
      { path: 'school', component: SchoolComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access

      // Other settings and management routes
      { path: 'Incometypes', component: IncomeTypesComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'FeeStatement', component: FeeStatementComponent, data: { roles: ['finance'] } }, // Example of a route with static role-based access
      { path: 'parent', component: ParentComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'delete-confirmation', component: DeleteConfirmationComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'school-management', component: SchoolManagementComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'branding-and-appearance', component: BrandingAndAppearanceComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'data-management', component: DataManagementComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'user-directory', component: UserDirectoryComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'bulk-upload', component: BulkUploadComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access

      // Financial settings
      { path: 'financial-settings', component: FinancialSettingsComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'fee-structure-setup', component: FeeStructureSetupComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'fee-installment-plans', component: FeeInstallmentPlansComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access

      // System settings
      { path: 'system-settings', component: SystemSettingsComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'communication-settings', component: CommunicationSettingsComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'email-and-sms-templates', component: EmailAndSmsTemplatesComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'notification-preferences', component: NotificationPreferencesComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access

      // School setup
      { path: 'time-zone-and-language', component: TimeZoneAndLanguageComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'intergrations', component: IntergrationsComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'grade-section-setup', component: GradeSectionSetupComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access
      { path: 'academic-year-setup', component: AcademicYearSetupComponent, data: { roles: ['admin'] } }, // Example of a route with static role-based access

      // Account main routes
      { path: 'expenses', component: ExpensesComponent, data: { roles: ['finance'] } }, // Example of a route with static role-based access
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
