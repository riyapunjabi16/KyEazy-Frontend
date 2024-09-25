import { Component, OnDestroy, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { Employee } from 'src/app/models/employee.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { pieChartData } from 'src/app/models/pie-chart-data.model';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss'],
})
export class CompanyDashboardComponent implements OnInit, OnDestroy {
  public companyService: CompanyService;
  public employees: Employee[];
  public company: Company;
  public isSmall!: boolean;
  public zeroEmployees!: boolean;
  public loading!: boolean;
  public employeeSubscription: any;
  public companySubscription: any;
  breakpoint$: Observable<Breakpoint>;
  pieChartData: any;

  constructor(
    public store: Store<{ breakpoint: Breakpoint }>,
    companyService: CompanyService
  ) {
    this.breakpoint$ = store.select('breakpoint');
    this.breakpoint$.subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });

    this.companyService = companyService;
    this.employees = [{}] as Employee[];
    this.company = {} as Company;
  }

  ngOnInit(): void {
    let k = localStorage.getItem('Id');
    if (k != null) {
      this.loading = true;
      this.companyService.getCompanyDetails(parseInt(k));
    }
    this.companySubscription = this.companyService.companySubject.subscribe((company) => {
      this.company = company;
      if (this.company.numberOfTotalEmployees === 0) {
        this.zeroEmployees = true;
      } else {
        this.zeroEmployees = false;
      }
      pieChartData[0].value = this.company.numberOfRegisteredEmployees;
      pieChartData[1].value = this.company.numberOfAcceptedEmployees;
      pieChartData[2].value = this.company.numberOfRejectedEmployees;
      pieChartData[3].value = this.company.numberOfPendingEmployees;
      pieChartData[4].value =
        this.company.numberOfTotalEmployees -
        this.company.numberOfAcceptedEmployees -
        this.company.numberOfRejectedEmployees -
        this.company.numberOfPendingEmployees -
        this.company.numberOfRegisteredEmployees;
      Object.assign(this, { pieChartData });
      if (k != null) {
        this.loading = true;
        this.companyService.getEmployees(
          parseInt(k),
          2,
          1,
          'dateTimeOfApplication',
          'all'
        );
      }
    });

    this.employeeSubscription = this.companyService.employeesSubject.subscribe((employees) => {
      this.employees = employees;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.employeeSubscription.unsubscribe();
    this.companySubscription.unsubscribe();
  }

}
