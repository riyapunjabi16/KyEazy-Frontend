import { ActionDTO } from 'src/app/models/action.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactUs } from './../../models/contact-us.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactUsService } from '../../services/contact-us/contact-us.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  messageForm: any;
  loading!: boolean;
  isSubmitted: boolean = false;
  contactUs: any;

  constructor(
    public contactUsService: ContactUsService,
    public snackBar: MatSnackBar
  ) {
    this.contactUs = {} as ContactUs;
  }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.messageForm.status === 'INVALID') return;

    this.isSubmitted = true;
    this.contactUs.name = this.messageForm.value.name;
    this.contactUs.message = this.messageForm.value.message;
    this.contactUs.email = this.messageForm.value.email;

    this.loading = true;

    this.contactUsService.post(this.contactUs).subscribe((data: ActionDTO) => {
      this.snackBar.open(data.message, 'OK');
    });
  }
}
