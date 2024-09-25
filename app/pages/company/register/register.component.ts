import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ActionDTO } from 'src/app/models/action.model';
import { Employee } from 'src/app/models/employee.model';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit,OnDestroy {
  firstName!: string;
  lastName!: string;
  isSubmitted: boolean;
  employeeForm: any;
  newEmployee: Employee;
  companyService: CompanyService;
  form: any;
  dialog: MatDialog;
  coinSubscription: any;
  public registrationStatus: ActionDTO;
  public actionDTOSubject: Subject<ActionDTO>;
  loading!: boolean;
  coins!: number;

  constructor(
    companyService: CompanyService,
    dialog: MatDialog,
    public snackbar: MatSnackBar
  ) {
    this.isSubmitted = false;
    this.newEmployee = {} as Employee;
    this.companyService = companyService;
    this.form = new FormGroup({
      document: new FormControl('', [Validators.required]),
    });
    this.dialog = dialog;
    this.registrationStatus = {} as ActionDTO;
    this.actionDTOSubject = new Subject();
  }

  ngOnDestroy(): void {
    this.coinSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contactNumber: new FormControl(null, [Validators.required]),
    });
    let k = localStorage.getItem('Id');
    if (k != null) this.companyService.getCompanyDetails(parseInt(k));
    this.coinSubscription = this.companyService.coinSubject.subscribe((coins) => {
      this.coins = coins;
    });
  }

  onSubmit() {
    if (this.employeeForm.status === 'INVALID') return;
    if (this.coins < 50) {
      this.snackbar.open('Not Enough Coins ! Please purchase');
      return;
    }
    this.newEmployee.contactNumber = this.employeeForm.value.contactNumber;
    this.newEmployee.firstName = this.employeeForm.value.firstName;
    this.newEmployee.lastName = this.employeeForm.value.lastName;
    this.newEmployee.emailID = this.employeeForm.value.email;
    let k = localStorage.getItem('Id');
    this.loading = true;
    if (k == null) return;
    this.companyService
      .registerEmployee(this.newEmployee, parseInt(k))
      .subscribe(
        (data: Employee) => {
          console.log('-----------------------');
          console.log('Username', data.username);
          console.log('Password', data.password);
          console.log('-----------------------');
          if (k != null) this.companyService.getCompanyDetails(parseInt(k));
          this.snackbar.open('Successfully registered', 'Okay');
          this.loading = false;
        },
        (error: any) => {
          this.snackbar.open('Error in registration', 'Okay');
          this.loading = false;
        }
      );
  }

  public errorHandling = (control: string, error: string) => {
    return this.employeeForm.controls[control].hasError(error);
  };

  getErrorMessage() {
    if (this.employeeForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.employeeForm.controls['email'].hasError('errors')
      ? ''
      : 'Not a valid email';
  }

  onChange(event: any) {
    let file = event.target.files[0];
    this.form.patchValue({
      document: file,
    });
  }

  onSave() {
    if (this.form.status === 'INVALID') {
      return;
    }

    const formData = new FormData();
    formData.append('employeeCSV', this.form.get('document').value);

    let k = localStorage.getItem('Id');

    if (k != null) {
      this.companyService.registerEmployees(formData, parseInt(k));
    }
  }


}
