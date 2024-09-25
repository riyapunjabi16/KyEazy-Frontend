import { ContactUsComponent } from './../contact-us/contact-us.component';
import { ContactUs } from './../../models/contact-us.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.scss'],
})
export class LearnMoreComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      companyType: string;
    },
    public bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {}

  openContactUs() {
    this.bottomSheet.open(ContactUsComponent);
  }
}
