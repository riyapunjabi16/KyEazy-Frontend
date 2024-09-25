import { AdminService } from './../../../services/admin/admin.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { Store } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Paginator } from 'src/app/models/paginator.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-all-employees',
  templateUrl: './admin-all-employees.component.html',
  styleUrls: ['./admin-all-employees.component.scss'],
})
export class AdminAllEmployeesComponent implements OnInit, OnDestroy {
  @ViewChild('matPaginator') matPaginator!: MatPaginator;
  public emailFormControl = new FormControl('');
  public isSmall: boolean;
  public paginator!: Paginator;
  public adminService: AdminService;
  public filter: string;
  public sortBy: string;
  public search: string;
  public employees: Employee[];
  public loading!: boolean;
  public zeroEmployees!: boolean;
  public searchText: string;
  public employeeSubscription: any;
  constructor(
    adminService: AdminService,
    public store: Store<{ breakpoint: Breakpoint }>
  ) {
    this.isSmall = false;
    this.searchText = '';
    this.filter = 'all';
    this.sortBy = 'dateTimeOfApplication';
    this.search = '';
    this.adminService = adminService;
    this.employees = [{}] as Employee[];
    this.paginator = {} as Paginator;
    this.paginator.currentPageIndex = 0;
    this.paginator.currentPageSize = 5;
    this.paginator.pageSizeOptions = [5, 10, 15, 20, 25];
  }

  ngOnDestroy(): void {
    this.employeeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });

    this.loading = true;
    this.adminService.getNoOfEmployees().subscribe((response: number) => {
      this.paginator.length = response;
      this.adminService.viewAllApplications(5, 1, this.sortBy, this.filter);
      if (response === 0) {
        this.zeroEmployees = true;
      } else {
        this.zeroEmployees = false;
      }
    });

    this.employeeSubscription = this.adminService.employeesSubject.subscribe((employees) => {
      this.employees = employees;
      this.loading = false;
    });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  OnPageChange(event: any) {
    this.paginator.currentPageIndex = event.pageIndex;
    this.paginator.currentPageSize = event.pageSize;
    if (this.searchText.trim().length == 0) {
      this.loading = true;
      this.adminService.getEmployeesSize(this.filter).subscribe((response) => {
        this.matPaginator.length = response;
        this.adminService.viewAllApplications(
          this.paginator.currentPageSize,
          this.paginator.currentPageIndex + 1,
          this.sortBy,
          this.filter
        );
      });
    } else {
      this.loading = true;
      this.adminService
        .getSearchedEmployeesSize(this.searchText, this.filter)
        .subscribe((response) => {
          this.matPaginator.length = response;
          this.adminService.getAllEmployeesByName(
            this.searchText,
            this.paginator.currentPageSize,
            this.paginator.currentPageIndex + 1,
            this.sortBy,
            this.filter
          );
        });
    }
  }

  onSearchText(event: any) {
    this.searchText = event.target.value;
  }

  OnSearchSelect() {
    if (this.searchText.trim().length === 0) {
      this.matPaginator.pageIndex = 0;
      this.loading = true;
      this.adminService.getEmployeesSize(this.filter).subscribe((response) => {
        this.matPaginator.length = response;
        this.adminService.viewAllApplications(5, 1, this.sortBy, this.filter);
      });
    } else {
      this.matPaginator.pageIndex = 0;
      this.loading = true;
      this.adminService
        .getSearchedEmployeesSize(this.searchText, this.filter)
        .subscribe((response) => {
          this.matPaginator.length = response;
          this.adminService.getAllEmployeesByName(
            this.searchText,
            5,
            1,
            this.sortBy,
            this.filter
          );
        });
    }
  }

  OnSortSelect(event: any) {
    this.sortBy = event.value;
    this.matPaginator.pageIndex = 0;
    this.loading = true;
    this.adminService.getEmployeesSize(this.filter).subscribe((response) => {
      this.matPaginator.length = response;
      this.adminService.viewAllApplications(5, 1, this.sortBy, this.filter);
    });
  }

  OnFilterSelect(event: any) {
    this.filter = event.value;
    this.matPaginator.pageIndex = 0;
    this.loading = true;
    this.adminService.getEmployeesSize(this.filter).subscribe((response) => {
      this.matPaginator.length = response;
      this.adminService.viewAllApplications(5, 1, this.sortBy, this.filter);
    });
  }
}
