import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { Details } from 'src/app/models/details.model';
import { Documents } from 'src/app/models/documents.model';
import { Liveliness } from 'src/app/models/liveliness.model';
import { Selfie } from 'src/app/models/selfie.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  public employeeId: any;
  public employee: any;
  public details: any;
  public userType: any;
  public documents: Documents;
  public company: any;
  public liveliness: Liveliness;
  public selfie: Selfie;
  public message!: string;
  public employeeLoading: any;
  public companyLoading: any;
  public videoLoading: any;
  public imageLoading: any;
  public documentLoading: any;

  public employeeSubscription: any;
  public documentSubscription: any;
  public videoSubscription: any;
  public companySubscription: any;

  constructor(
    private store: Store<{ route: string }>,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private adminService: AdminService
  ) {
    this.details = {} as Details;
    this.documents = {} as Documents;
    this.liveliness = {} as Liveliness;
    this.selfie = {} as Selfie;
    this.imageLoading = false;
    this.employeeLoading = false;
    this.videoLoading = false;
    this.companyLoading = false;
    this.documentLoading = false;
  }

  ngOnDestroy(): void {
    this.employeeSubscription.unsubscribe();
    this.videoSubscription.unsubscribe();
    this.companySubscription.unsubscribe();
    this.documentSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.store.select('route').subscribe((route) => {
      if (route.substring(1, 4) === 'com') {
        this.userType = 'company';
      } else {
        this.userType = 'admin';
      }
    });

    this.activatedRoute.params.subscribe((params) => {
      this.employeeId = params.employeeId;
      this.employeeLoading = true;
      this.adminService.viewEmployeeDetails(this.employeeId);
    });

    this.employeeSubscription = this.adminService.employeeSubject.subscribe((employee) => {
      this.employeeLoading = false;
      this.employee = employee;
      this.message = employee.review;
      this.details.addressLine1 = employee.address.streetNumber;
      this.details.addressLine2 = employee.address.street;
      this.details.city = employee.address.city;
      this.details.state = employee.address.state;
      this.details.country = employee.address.country;
      this.details.contact = employee.contactNumber;
      this.details.email = employee.emailID;
      this.details.gender = employee.gender;
      this.details.firstName = employee.firstName;
      this.details.lastName = employee.lastName;
      // Parsing Documents Details
      this.documents.documentNumber = employee.documentNumber;
      this.documents.documentType = employee.documentType;
      this.liveliness.question = employee.question;
      // Parsing Image
      this.imageLoading = true;
      fetch('data:image/png;base64,' + this.employee.capturedImage)
        .then((response) => response.blob())
        .then((blob) => {
          this.selfie.imageBlob = blob;
          this.selfie.image = new File([blob], employee.username, {
            type: 'image/png',
          });
          this.imageLoading = false;
        });
      // Parsing Documents
      this.documents.documentNumber = this.employee.documentNumber;
      this.documents.documentType = this.employee.documentType;
      // Getting Other Details
      this.companyLoading = true;
      this.companyService.getCompanyDetails(this.employee.companyId);
      this.videoLoading = true;
    });

    this.companySubscription = this.companyService.companySubject.subscribe((company) => {
      this.companyLoading = false;
      this.company = company;
      this.adminService.getEmployeeVideo(this.employee.username);
    });

    this.videoSubscription = this.adminService.employeeVideoSubject.subscribe((video: any) => {
      this.videoLoading = false;
      this.liveliness.video = video;
      this.documentLoading = true;
      this.adminService.getEmployeeDocument(this.employee.username);
    });

    this.documentSubscription = this.adminService.employeeDocumentSubject.subscribe((document :any) => {
      this.documentLoading = false;
      this.documents.document = document;
    })

  }
}
