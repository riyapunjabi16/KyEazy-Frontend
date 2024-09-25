import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionDTO } from 'src/app/models/action.model';
import { Company } from 'src/app/models/company.model';
import { Employee } from 'src/app/models/employee.model';
import { exceptionDTO } from 'src/app/models/exceptionDTO.model';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Credentials } from 'src/app/models/credentials.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  public employees: Employee[];
  public employee: Employee;
  public company: Company;
  public employeesSubject: Subject<Employee[]>;
  public employeeSubject: Subject<Employee>;
  public companySubject: Subject<Company>;
  public actionDTOSubject: Subject<ActionDTO>;
  public registrationStatus: ActionDTO;
  public APIResponse: ActionDTO | exceptionDTO;
  public reportedSubject: Subject<Boolean>;
  public coinSubject: Subject<number>;

  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient,
    public snackbar: MatSnackBar
  ) {
    this.employees = [];
    this.registrationStatus = {} as ActionDTO;
    this.employee = {} as Employee;
    this.employeesSubject = new Subject();
    this.employeeSubject = new Subject();
    this.actionDTOSubject = new Subject();
    this.companySubject = new Subject();
    this.company = {} as Company;
    this.APIResponse = {} as ActionDTO | exceptionDTO;
    this.reportedSubject = new Subject();
    this.coinSubject = new Subject();
  }

  login(credentials: Credentials) {
    return this.loginService.doLogin(credentials);
  }

  register(newCompany: Company) {
    return this.httpClient
      .post<Company>(`${environment.backendURL}/company/register`, newCompany)
      .pipe(map((response) => response as Company));
  }

  getEmployees(
    id: number,
    pageSize: number,
    pageNumber: number,
    sort: string,
    filter: string
  ): void {
    this.httpClient
      .get(
        `${environment.backendURL}/company/employees/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}&sort=${sort}&filter=${filter}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  getEmployeesByName(
    id: number,
    name: string,
    pageSize: number,
    pageNumber: number,
    sort: string,
    filter: string
  ): void {
    this.httpClient
      .get(
        `${environment.backendURL}/company/get-employees-by-name/${id}/${name}?pageSize=${pageSize}&pageNumber=${pageNumber}&sort=${sort}&filter=${filter}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(results);
      });
  }

  registerEmployee(newEmployee: Employee, companyId: number) {
    return this.httpClient
      .post<Employee>(
        `${environment.backendURL}/company/register-employee/${companyId}`,
        newEmployee
      )
      .pipe(map((response) => response as Employee));
  }

  registerEmployees(newEmployee: FormData, companyId: number) {
    return this.httpClient
      .post<ActionDTO>(
        `${environment.backendURL}/company/register-employees/${companyId}`,
        newEmployee
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe(
        (results: ActionDTO) => {
          this.getCompanyDetails(companyId);
          this.snackbar.open('Successfully registered', 'Okay');
        },
        (error) => {
          this.snackbar.open('Not Enough Coins ! Please purchase');
        }
      );
  }

  getCompanyDetails(id: number) {
    return this.httpClient
      .get(`${environment.backendURL}/company/get-company-details/${id}`)
      .pipe(map((response) => response as Company))
      .subscribe((results: Company) => {
        this.coinSubject.next(results.coins);
        this.companySubject.next(results);
      });
  }

  addIcon(id: number, icon: FormData) {
    return this.httpClient.patch<ActionDTO>(
      `${environment.backendURL}/company/add-icon/${id}`,
      icon
    );
  }

  updateProfile(newCompany: Company): void {
    this.httpClient
      .patch<ActionDTO>(
        `${environment.backendURL}/company/update-profile`,
        newCompany
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.registrationStatus = results;
        this.actionDTOSubject.next(results);
      });
  }

  reportEmployee(message: string, employeeId: number): void {
    this.httpClient
      .post<ActionDTO>(
        `${environment.backendURL}/company/report-employee/${employeeId}`,
        message
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((data: ActionDTO) => {
        this.reportedSubject.next(data.success);
      });
  }

  reKyc(employeeId: number) {
    return this.httpClient
      .get(`${environment.backendURL}/company/re-kyc/${employeeId}`)
      .pipe(map((response) => response as Employee));
  }

  getEmployeesSize(id: number, filter: string) {
    return this.httpClient
      .get(
        `${environment.backendURL}/company/get-employees-size/${id}/${filter}`
      )
      .pipe(map((response) => response as number));
  }

  getSearchedEmployeesSize(id: number, name: string, filter: string) {
    return this.httpClient
      .get<number>(
        `${environment.backendURL}/company/get-searched-employees-size/${id}/${name}/${filter}`
      )
      .pipe(map((response) => response as number));
  }

  getKyeasyVerification(id: number): Observable<string>  {
    return this.httpClient
      .get<Company>(`${environment.backendURL}/company/get-company-details/${id}`)
      .pipe(map((response) => response.kyeasyVerification))
  }

}
