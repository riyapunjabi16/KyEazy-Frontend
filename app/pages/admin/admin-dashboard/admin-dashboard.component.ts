import { Breakpoint } from './../../../models/breakpoint.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Company } from 'src/app/models/company.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import { pieChartData } from 'src/app/models/pie-chart-data.model';
import { barChartData } from 'src/app/models/barChartData.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  public isSmall!: boolean;
  public companies: Company[];
  public adminService: AdminService;
  public numOfPendingEmployees!: number;
  public numOfAcceptedEmployees!: number;
  public companyId!: number;
  public companyRoute!: string;
  public pieChartData: any;
  public zeroEmployees!: boolean;
  public zeroCompanies!: boolean;
  public totalNoOfEmployees!: number;
  public barChartData: any;
  public companySubscription: any;

  loading!: boolean;
  constructor(
    public store: Store<{ breakpoint: Breakpoint }>,
    adminService: AdminService
  ) {
    this.loading = false;
    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });

    this.companies = [{}] as Company[];
    this.adminService = adminService;
  }

  ngOnDestroy(): void {
    this.companySubscription.unsubscribe();
  }

  onViewEmployees(companyId: number) {
    this.companyRoute = '/admin/company/employees/' + companyId;
  }

  ngOnInit(): void {
    this.loading = true;
    this.adminService.getNoOfEmployees().subscribe((response: number) => {
      if (response === 0) {
        this.zeroEmployees = true;
      } else {
        this.zeroEmployees = false;
      }
      this.totalNoOfEmployees = response;
      this.adminService
        .getNoOfRegisteredEmployees()
        .subscribe((response: number) => {
          pieChartData[0].value = response;
          this.adminService
            .getNoOfAcceptedEmployees()
            .subscribe((response: number) => {
              pieChartData[1].value = response;
              this.adminService
                .getNoOfRejectedEmployees()
                .subscribe((response: number) => {
                  pieChartData[2].value = response;
                  this.adminService
                    .getNoOfPendingEmployees()
                    .subscribe((response: number) => {
                      pieChartData[3].value = response;
                      pieChartData[4].value =
                        this.totalNoOfEmployees -
                        (pieChartData[0].value +
                          pieChartData[1].value +
                          pieChartData[2].value +
                          pieChartData[3].value);
                      Object.assign(this, { pieChartData });
                      this.adminService
                        .getTopPerformer()
                        .subscribe((companies: Company[]) => {
                          for (let i = 0; i < companies.length; i++) {
                            barChartData[i].name = companies[i].name;
                            barChartData[i].series[0].value =
                              companies[i].numberOfRegisteredEmployees;
                            barChartData[i].series[1].value =
                              companies[i].numberOfAcceptedEmployees;
                            barChartData[i].series[2].value =
                              companies[i].numberOfRejectedEmployees;
                            barChartData[i].series[3].value =
                              companies[i].numberOfPendingEmployees;
                          }
                          Object.assign(this, { pieChartData });
                          this.adminService.getCompanies(2, 1);
                        });
                    });
                });
            });
        });
    });

    this.companySubscription = this.adminService.companiesSubject.subscribe((companies) => {
      this.loading = false;
      this.companies = companies;
      if (companies.length === 0) {
        this.zeroCompanies = true;
      } else {
        this.zeroCompanies = false;
      }
    });
  }
}
