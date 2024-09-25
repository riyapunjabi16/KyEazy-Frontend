import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { CompanyService } from 'src/app/services/company/company.service';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: any;
  @Input() isSmall: any;
  @Input() user: any;
  public isDisable: boolean;
  public kyeasyVerification: any;
  @Output() rekyc = new EventEmitter<number>();

  constructor(
    public companyService: CompanyService,
    public store: Store<{ breakpoint: Breakpoint }>,
    public snackbar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.isDisable = false;
    this.store.select('breakpoint').subscribe((change: Breakpoint) => {
      if (change.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });
  }

  ngOnInit(): void {
    this.isDisable = true;
    this.companyService.getKyeasyVerification(this.employee.companyId).subscribe((kyeasyVerification: string) => {
      this.isDisable = false;
      this.kyeasyVerification = kyeasyVerification;
    })
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  OnReport() {
    if (this.employee.status === 'Registered') {
      this.snackbar.open('Please Wait for Employee To Register.', 'Retry');
      return;
    }
    this.dialog.open(ModalComponent, {
      data: {
        type: 'REPORT',
        employeeId: this.employee.employeeId,
      },
    });
  }

  viewProfile() {
    if (this.user === 'admin' && this.kyeasyVerification === 'n') {
      this.snackbar.open('Company has not opted for KYEazy Verification', 'Dismiss');
      return;
    }
    if (this.employee.status === 'Registered') {
      this.snackbar.open('Please Wait for Employee To Register.', 'Retry');
    } else {
      this.router.navigate([
        `/${this.user}/employee/profile/${this.employee.employeeId}`,
      ]);
    }
  }

  onReKyc() {
    this.rekyc.emit(this.employee.employeeId);
  }
}
