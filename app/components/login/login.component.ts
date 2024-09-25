import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ModalComponent } from '../modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Credentials } from 'src/app/models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  durationInSeconds = 5;
  loading!: boolean;
  @Input()
  public type: any;
  @Input()
  public dialog: any;
  public form;
  public credentials: Credentials;

  constructor(
    public snackbar: MatSnackBar,
    public store: Store<{ loggedin: boolean }>,
    public router: Router,
    private companyService: CompanyService,
    private employeeService: EmployeeService,
    private adminService: AdminService,
    private loginService: LoginService,
    public errorDialog: MatDialog
  ) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.loginService = loginService;
    this.credentials = {} as Credentials;
  }

  ngOnInit(): void {}
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }
  onSubmit(): void {
    this.credentials.username = this.form.value.username;
    this.credentials.password = this.form.value.password;

    if (this.form.status === 'INVALID') return;

    if (this.type == 'EMPLOYEE_LOGIN') {
      this.credentials.role = 'EMPLOYEE';
      localStorage.setItem('userType', 'EMPLOYEE');
      this.loading = true;
      this.employeeService.login(this.credentials).subscribe(
        (response: any) => {
          this.loginService.loginUser(response.token, response.id);
          this.router.navigate(['/employee/kyc']);
          this.loading = false;
        },
        (error) => {
          this.openSnackBar('Invalid Employee Credentials', 'Retry');
          this.loading = false;
        }
      );
    }

    if (this.type == 'ADMIN_LOGIN') {
      this.credentials.role = 'ADMIN';
      localStorage.setItem('userType', 'ADMIN');
      this.loading = true;
      this.adminService.login(this.credentials).subscribe(
        (response: any) => {
          this.loginService.loginUser(response.token, '');
          this.router.navigate(['/admin/dashboard']);
          this.loading = false;
        },
        (error: any) => {
          this.loading = false;
          this.snackbar.open('Invalid Admin Credentials', 'Retry');
        }
      );
    }

    if (this.type == 'COMPANY_LOGIN') {
      this.credentials.role = 'COMPANY';
      localStorage.setItem('userType', 'COMPANY');
      this.loading = true;
      this.companyService.login(this.credentials).subscribe(
        (response: any) => {
          this.loginService.loginUser(response.token, response.id);
          this.router.navigate(['/company/dashboard']);
          this.loading = false;
        },
        (error: any) => {
          this.openSnackBar('Invalid Company Credentials', 'Retry');
          this.loading = false;
        }
      );
    }

    this.dialog?.close();
  }
}
