import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Details } from 'src/app/models/details.model';
import { Employee } from 'src/app/models/employee.model';
import { setDetails } from 'src/app/redux/actions/details.action';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit,OnDestroy {
  @Input() stepper!: MatStepper;
  public employeeSubscription: any;
  form: any;
  employee: Employee;
  isReadOnly = false;

  constructor(
    private employeeService: EmployeeService,
    public store: Store<{ details: Details }>
  ) {
    this.employee = {} as Employee;
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      addressLine1: new FormControl(null, Validators.required),
      addressLine2: new FormControl(null),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.employeeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    let k = localStorage.getItem('Id');

    if (k != null) {
      this.employeeService.viewProfile(parseInt(k));
    }

    this.employeeSubscription = this.employeeService.employeeSubject.subscribe((employee) => {
      this.employee = employee;
      this.form = new FormGroup({
        firstName: new FormControl(
          { value: this.employee.firstName, disabled: true },
          Validators.required
        ),
        lastName: new FormControl(
          { value: this.employee.lastName, disabled: true },
          Validators.required
        ),
        gender: new FormControl('m', Validators.required),
        contact: new FormControl(
          { value: this.employee.contactNumber, disabled: true },
          Validators.required
        ),
        email: new FormControl(
          { value: this.employee.emailID, disabled: true },
          [Validators.required, Validators.email]
        ),
        addressLine1: new FormControl(null, Validators.required),
        addressLine2: new FormControl(null),
        city: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
      });
    });
  }

  onSave() {
    if (this.form.status === 'INVALID') return;
    let details = {} as Details;
    details.firstName = this.form.getRawValue().firstName;
    details.lastName = this.form.getRawValue().lastName;
    details.gender = this.form.value.gender;
    details.addressLine1 = this.form.value.addressLine1;
    details.addressLine2 = this.form.value.addressLine2;
    details.city = this.form.value.city;
    details.contact = this.form.getRawValue().contact;
    details.state = this.form.value.state;
    details.country = this.form.value.country;
    details.email = this.form.getRawValue().email;
    this.store.dispatch(setDetails(details));
    this.stepper.next();
  }
}
