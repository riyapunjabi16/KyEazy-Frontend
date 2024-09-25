import { AllCompaniesComponent } from './pages/admin/all-companies/all-companies.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
import { CompanyComponent } from './pages/company/company.component';
import { EmployeesComponent } from './pages/company/employees/employees.component';
import { RegisterComponent } from './pages/company/register/register.component';
import { SignupComponent } from './pages/company/signup/signup.component';
import { KycComponent } from './pages/employee/kyc/kyc.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { CompanyGuard } from './guards/company/company.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { EmployeeGuard } from './guards/employee/employee.guard';
import { ProfilePageComponent } from './pages/employee/profile-page/profile-page.component';
import { AdminAllEmployeesComponent } from './pages/admin/admin-all-employees/admin-all-employees.component';
import { SubscriptionComponent } from './pages/company/subscription/subscription.component';

const routes: Routes = [
  {
    path: 'employee/kyc',
    component: KycComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'company',
    component: CompanyComponent,
    children: [
      {
        path: 'dashboard',
        component: CompanyDashboardComponent,
        canActivate: [CompanyGuard],
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        canActivate: [CompanyGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [CompanyGuard],
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'employee/profile/:employeeId',
        component: ProfilePageComponent,
        canActivate: [CompanyGuard],
      },
      {
        path: 'wallet',
        component: SubscriptionComponent,
        canActivate: [CompanyGuard],
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'login',
        component: AdminLoginComponent,
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'all-employees',
        component: AdminAllEmployeesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'all-companies',
        component: AllCompaniesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'company/employees/:companyId',
        component: EmployeesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'employee/profile/:employeeId',
        component: ProfilePageComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
