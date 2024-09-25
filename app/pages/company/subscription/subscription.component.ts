import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddCoinsComponent } from 'src/app/components/add-coins/add-coins.component';
import { PaymentHistory } from 'src/app/models/payment-history.model';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit,OnDestroy {
  amount!: string;
  coinBalance!: number;
  addCoinsText!: string;
  pricePerCoin!: number;
  invalidForm: boolean;
  coinsToAdd!: number;
  companyId!: number;
  orderHistory: PaymentHistory[];
  displayedColumns: string[];
  rzp: any;
  loading: boolean;
  companySubscription: any;

  constructor(
    private paymentService: PaymentService,
    private companyService: CompanyService,
    private _bottomSheet: MatBottomSheet,
    private ngZone: NgZone
  ) {
    this.invalidForm = true;
    this.loading = false;
    this.orderHistory = [{}] as PaymentHistory[];
    this.displayedColumns = [];
  }

  ngOnDestroy(): void {
    this.companySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.displayedColumns = [
      'companyOrderId',
      'orderId',
      'paymentId',
      'amount',
    ];
    let k = localStorage.getItem('Id');

    if (k != null) {
      this.companyId = parseInt(k);
    }

    this.loading = true;
    this.companyService.getCompanyDetails(this.companyId);

    this.companySubscription = this.companyService.companySubject.subscribe((company) => {
      this.loading = true;
      this.ngZone.run(() => (this.coinBalance = company.coins));
      this.paymentService.getOrderHistory(this.companyId);
      this.paymentService.orderHistory.subscribe((p) => {
        this.ngZone.run(() => (this.orderHistory = p));
        this.loading = false;
      });
    });
  }

  openBottomSheet() {
    this._bottomSheet.open(AddCoinsComponent);
  }
}
