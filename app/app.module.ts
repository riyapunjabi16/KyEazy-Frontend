import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './components/login/login.component';
import { SelfieComponent } from './components/selfie/selfie.component';
import { LivelinessComponent } from './components/liveliness/liveliness.component';
import { ReviewComponent } from './components/review/review.component';
import { DetailsComponent } from './components/details/details.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { ProfileComponent } from './components/profile/profile.component';

import { SignupComponent } from './pages/company/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeesComponent } from './pages/company/employees/employees.component';
import { KycComponent } from './pages/employee/kyc/kyc.component';
import { RegisterComponent } from './pages/company/register/register.component';
import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CompanyComponent } from './pages/company/company.component';
import { breakpointReducer } from './redux/reducers/breakpoint.reducer';
import { detailsReducer } from './redux/reducers/details.reducer';
import { documentsReducer } from './redux/reducers/documents.reducer';
import { routeReducer } from './redux/reducers/route.reducer';
import { menuReducer } from './redux/reducers/menu.reducer';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { selfieReducer } from './redux/reducers/selfie.reducer';
import { livelinessReducer } from './redux/reducers/liveliness.reducer';
import { LoginService } from './services/login/login.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AllCompaniesComponent } from './pages/admin/all-companies/all-companies.component';
import { MaterialModule } from './app-material.module';
import { CompanyGuard } from './guards/company/company.guard';
import {
  CarouselComponent,
  CarouselSlide,
} from './components/carousel/carousel.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { ProfilePageComponent } from './pages/employee/profile-page/profile-page.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { EmptyComponent } from './components/empty/empty.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CompanyCardComponent } from './components/company-card/company-card.component';
import { AdminAllEmployeesComponent } from './pages/admin/admin-all-employees/admin-all-employees.component';
import { SubscriptionComponent } from './pages/company/subscription/subscription.component';
import { ReportComponent } from './components/report/report.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AddCoinsComponent } from './components/add-coins/add-coins.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { ReasonComponent } from './components/reason/reason.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ModalComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    EmployeesComponent,
    KycComponent,
    RegisterComponent,
    DetailsComponent,
    DocumentsComponent,
    SelfieComponent,
    LivelinessComponent,
    ReviewComponent,
    CompanyDashboardComponent,
    AdminDashboardComponent,
    AdminComponent,
    CompanyComponent,
    EmployeesComponent,
    ProfileComponent,
    AdminLoginComponent,
    AdminAllEmployeesComponent,
    AllCompaniesComponent,
    CarouselComponent,
    CarouselSlide,
    EmployeeCardComponent,
    ProfilePageComponent,
    BarChartComponent,
    EmptyComponent,
    PieChartComponent,
    CompanyCardComponent,
    SubscriptionComponent,
    ReportComponent,
    ContactUsComponent,
    AddCoinsComponent,
    LearnMoreComponent,
    ReasonComponent,
  ],
  imports: [
    StoreModule.forRoot({
      breakpoint: breakpointReducer,
      details: detailsReducer,
      documents: documentsReducer,
      route: routeReducer,
      menu: menuReducer,
      selfie: selfieReducer,
      liveliness: livelinessReducer,
    }),
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    MaterialModule,
  ],
  providers: [
    LoginService,
    CompanyGuard,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
    ],
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 5000 },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
