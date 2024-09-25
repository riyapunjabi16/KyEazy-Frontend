import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss'],
})
export class ReasonComponent implements OnInit {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public reason: string) {}

  ngOnInit(): void {}
}
