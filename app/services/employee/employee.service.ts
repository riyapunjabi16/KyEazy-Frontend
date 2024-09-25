import { Injectable } from '@angular/core';
import { ActionDTO } from 'src/app/models/action.model';
import { Employee } from 'src/app/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';
import { Credentials } from 'src/app/models/credentials.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public employee: Employee;
  public updateStatus: ActionDTO;
  public actionDTOSubject: Subject<ActionDTO>;
  public employeeSubject: Subject<Employee>;

  public detailsSubject = new Subject<void>();
  public documentSubject = new Subject<void>();
  public statusSubject = new Subject<void>();
  public videoSubject = new Subject<void>();
  public imageSubject = new Subject<void>();

  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient
  ) {
    this.employee = {} as Employee;
    this.updateStatus = {} as ActionDTO;
    this.actionDTOSubject = new Subject();
    this.employeeSubject = new Subject();

    this.detailsSubject = new Subject<void>();
    this.documentSubject = new Subject<void>();
    this.statusSubject = new Subject<void>();
    this.videoSubject = new Subject<void>();
    this.imageSubject = new Subject<void>();
  }

  login(credentials: Credentials) {
    return this.loginService.doLogin(credentials);
  }

  getEmployee(employeeId: number) {
    return this.httpClient.get<Employee>(
      `${environment.backendURL}/employee/${employeeId}`
    );
  }

  updateProfile(newEmployee: Employee): void {
    this.httpClient
      .patch<ActionDTO>(
        `${environment.backendURL}/employee/update-profile`,
        newEmployee
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.detailsSubject.next();
      });
  }

  updateEmployeeStatus(newEmployee: Employee): void {
    this.httpClient
      .get<ActionDTO>(
        `${environment.backendURL}/employee/update-status/${newEmployee.employeeId}`
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.updateStatus = results;
        this.statusSubject.next();
      });
  }

  updateEmployeeImage(id: number, image: FormData): void {
    this.httpClient
      .patch<ActionDTO>(
        `${environment.backendURL}/employee/update-captured-image/${id}`,
        image
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.imageSubject.next();
      });
  }

  updateEmployeeVideo(id: number, video: FormData): void {
    this.httpClient
      .patch<ActionDTO>(
        `${environment.backendURL}/employee/update-video/${id}`,
        video
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.videoSubject.next();
      });
  }

  updateEmployeeDocument(id: number, document: FormData): void {
    this.httpClient
      .patch<ActionDTO>(
        `${environment.backendURL}/employee/update-document/${id}`,
        document
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.documentSubject.next();
      });
  }

  viewProfile(employeeId: number): void {
    this.httpClient
      .get(`${environment.backendURL}/employee/view-profile/${employeeId}`)
      .pipe(map((response) => response as Employee))
      .subscribe((results: Employee) => {
        this.employee = results;
        this.employeeSubject.next(this.employee);
      });
  }
}
