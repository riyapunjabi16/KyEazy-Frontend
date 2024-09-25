import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss'],
})
export class KycComponent implements OnInit {
  @ViewChild('stepper') private stepper!: MatStepper;

  private observable: any;
  public orientation: any;

  constructor(public observer: MediaObserver) {
    this.orientation = 'vertical';

    this.observable = this.observer
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        if (change.mqAlias === 'xs' || change.mqAlias === 'sm') {
          this.orientation = 'vertical';
        } else {
          this.orientation = 'horizontal';
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestory(): void {}
}
