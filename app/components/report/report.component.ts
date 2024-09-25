import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @Input() employeeId!: number;
  @Input() dialog: any;
  @Input() type!: string;

  public form;
  public loading!: boolean;
  public reason!: string;

  constructor(
    private adminService: AdminService,
    public companyService: CompanyService
  ) {
    this.form = new FormGroup({
      reason: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.status === 'INVALID') {
      return;
    }
    this.reason = this.form.value.reason;

    if (this.type === 'REPORT') {
      this.companyService.reportEmployee(this.reason, this.employeeId);
    }
    if (this.type === 'REJECT') {
      this.adminService.rejectEmployee(this.reason, this.employeeId);
    }

    this.dialog.close();
  }
}
