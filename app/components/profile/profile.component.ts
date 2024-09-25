import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Admin } from 'src/app/models/admin.model';
import { Details } from 'src/app/models/details.model';
import { Documents } from 'src/app/models/documents.model';
import { Employee } from 'src/app/models/employee.model';
import { Liveliness } from 'src/app/models/liveliness.model';
import { Selfie } from 'src/app/models/selfie.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ModalComponent } from '../modal/modal.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ReasonComponent } from '../reason/reason.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit,OnDestroy, AfterViewInit {
  @Input() userType!: string;
  @Input() selfie!: Selfie;
  @Input() company!: string;
  @Input() liveliness!: Liveliness;
  @Input() document!: Documents;
  @Input() employee!: Details;
  @Input() status!: string;
  @Input() employeeId!: number;
  @Input() review!: string;
  @Input() kyeasyVerification: any;
  @ViewChild('image') image!: any;
  @ViewChild('video') video!: any;
  statusSubscription: any;
  documentURL: any;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    public matBottomSheet: MatBottomSheet
  ) {}

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.statusSubscription = this.adminService.statusSubject.subscribe((response) => {
      this.status = response;
    });
  }

  ngAfterViewInit() {
    // Prase Image
    let blob = new Blob([this.selfie.image], { type: 'image/png' });
    let url = window.URL.createObjectURL(blob);
    this.image.nativeElement.src = url;

    // Parse Video
    blob = new Blob([this.liveliness.video], { type: 'video/mp4' });
    url = window.URL.createObjectURL(blob);
    this.video.nativeElement.src = url;

    // Parse Document
    blob = new Blob([this.document.document], { type: 'application/pdf' });
    console.log(this.document.document);
    url = URL.createObjectURL(blob);
    this.documentURL = url;
  }

  showReason(reason: string) {
    this.matBottomSheet.open(ReasonComponent, {
      data: reason,
    });
  }

  viewDocument() {
    window.open(this.documentURL);
  }

  acceptEmployee() {
    this.adminService.acceptEmployee(this.employeeId);
  }

  rejectEmployee() {
    this.dialog.open(ModalComponent, {
      data: {
        type: 'REJECT',
        employeeId: this.employeeId,
      },
    });
  }
}
