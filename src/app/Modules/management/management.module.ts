
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from 'src/app/material.module';

import { StaffComponent } from './staff/staff.component';
import { StudentComponent } from './student/student.component';
import { FeeCategoryComponent } from './feecategory/feecategory.component';
import { SytemUsersComponent } from './sytem-users/sytem-users.component';
import { AddSystemUserComponent } from './sytem-users/add-system-user/add-system-user.component';
import { RolesManagementComponent } from './roles-management/roles-management.component';
import { RolesMaintenanceComponent } from './roles-management/roles-maintenance/roles-maintenance.component';
import { RolesLookupsComponent } from './roles-management/roles-lookups/roles-lookups.component';
import { RolesComponent } from './sytem-users/roles/roles.component';
import { AddRolesComponent } from './sytem-users/roles/add-roles/add-roles.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { AddStaffComponent } from './staff/add-staff/add-staff.component';
import { SchoolComponent } from './school/school.component';
import { AddSchoolComponent } from './school/add-school/add-school.component';
import { ParentComponent } from './parent/parent.component';
import { AddParentComponent } from './parent/add-parent/add-parent.component';
import { DeleteConfirmationComponent } from './student/delete-confirmation/delete-confirmation.component';
import { SchoolManagementComponent } from './school-management/school-management.component';
import { BrandingAndAppearanceComponent } from './school-management/branding-and-appearance/branding-and-appearance.component';
import { DataManagementComponent } from './data-management/data-management.component';
import { UserDirectoryComponent } from './data-management/user-directory/user-directory.component';
import { BulkUploadComponent } from './data-management/bulk-upload/bulk-upload.component';
import { FinancialSettingsComponent } from './financial-settings/financial-settings.component';
import { SystemSettingsComponent } from './system-settings/system-settings.component';
import { CommunicationSettingsComponent } from './communication-settings/communication-settings.component';
import { AcademicYearSetupComponent } from './academic-year-setup/academic-year-setup.component';
import { EmailAndSmsTemplatesComponent } from './communication-settings/email-and-sms-templates/email-and-sms-templates.component';
import { NotificationPreferencesComponent } from './communication-settings/notification-preferences/notification-preferences.component';
import { FeeStructureSetupComponent } from './financial-settings/fee-structure-setup/fee-structure-setup.component';
import { FeeInstallmentPlansComponent } from './financial-settings/fee-installment-plans/fee-installment-plans.component';
import { TimeZoneAndLanguageComponent } from './system-settings/time-zone-and-language/time-zone-and-language.component';
import { IntergrationsComponent } from './system-settings/intergrations/intergrations.component';
import { GradeSectionSetupComponent } from './grade-and-section-setup/grade-and-section-setup.component';

@NgModule({
  declarations: [
    StaffComponent,
    StudentComponent,
    FeeCategoryComponent,
    SytemUsersComponent,
    AddSystemUserComponent,
    RolesManagementComponent,
    RolesMaintenanceComponent,
    RolesLookupsComponent,
    RolesComponent,
    AddRolesComponent,
    AddStudentComponent,
    AddStaffComponent,
    SchoolComponent,
    AddSchoolComponent,
    ParentComponent,
    AddParentComponent,
    DeleteConfirmationComponent,
    SchoolManagementComponent,
    BrandingAndAppearanceComponent,
    DataManagementComponent,
    UserDirectoryComponent,
    BulkUploadComponent,
    FinancialSettingsComponent,
    SystemSettingsComponent,
    CommunicationSettingsComponent,
    AcademicYearSetupComponent,
    EmailAndSmsTemplatesComponent,
    NotificationPreferencesComponent,
    FeeStructureSetupComponent,
    FeeInstallmentPlansComponent,
    TimeZoneAndLanguageComponent,
    IntergrationsComponent,
    GradeSectionSetupComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MaterialModule
  ]
})
export class ManagementModule { }
