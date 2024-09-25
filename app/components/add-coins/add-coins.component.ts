import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActionDTO } from 'src/app/models/action.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-add-coins',
  templateUrl: './add-coins.component.html',
  styleUrls: ['./add-coins.component.scss'],
})
export class AddCoinsComponent implements OnInit, OnDestroy {
  amount!: number;
  companyId!: number;
  form!: FormGroup;
  planToActivate!: number;
  coinsToAdd!: number;
  invalidForm!: boolean;
  rzp: any;
  employeesAddable!: number;
  perEmployeePrice!: number;
  numberOfEmployees!: number;
  companySubscription: any;
  orderSubscription: any;

  constructor(
    private companyService: CompanyService,
    private paymentService: PaymentService,
    public bottomSheet: MatBottomSheetRef<AddCoinsComponent>
  ) {
    this.form = new FormGroup({
      coinsCount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.companySubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
  }

  ngOnInit(): void {
    let k = localStorage.getItem('Id');
    if (k != null) {
      this.companyId = parseInt(k);
      this.companyService.getCompanyDetails(this.companyId);
      this.companySubscription = this.companyService.companySubject.subscribe((company) => {
        this.options.prefill.name = company.name;
        this.numberOfEmployees = company.numberOfTotalEmployees;
        if (company.numberOfTotalEmployees > 10000) this.planToActivate = 10;
        if (
          company.numberOfTotalEmployees > 100 &&
          company.numberOfTotalEmployees <= 1000
        )
          this.planToActivate = 8;
        if (company.numberOfTotalEmployees > 1000) this.planToActivate = 6;
        if (company.numberOfTotalEmployees < 100) this.planToActivate = 4;
      });
    }
  }

  options = {
    key: 'rzp_test_51mlvZBHt5Cbjq',
    amount: '',
    currency: 'INR',
    name: 'KYEazy',
    description: 'Buy Coins',
    image: '/assets/images/logo.png',
    order_id: '',
    handler: (response: any) => {
      this.paymentService
        .paymentSuccess(
          this.companyId,
          this.coinsToAdd,
          response.razorpay_payment_id,
          this.options.order_id,
          this.amount
        )
        .subscribe((response: ActionDTO) => {
          this.companyService.getCompanyDetails(this.companyId);
          this.paymentService.getOrderHistory(this.companyId);
        });
    },
    prefill: {
      name: 'Akshat Jain',
      email: 'akshatjane@gmail.com',
      contact: '7000834749',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#008080',
    },
  };

  onKey(event: KeyboardEvent) {
    if (this.form.status === 'VALID') {
      this.coinsToAdd = Math.floor(
        parseInt((event.target as HTMLInputElement).value)
      );
      this.employeesAddable = this.numberOfEmployees;
      this.amount = this.planToActivate * this.coinsToAdd;
      this.invalidForm = false;
    } else {
      this.invalidForm = true;
      this.coinsToAdd = 0;
    }
  }

  onSubmit() {
    let amount = this.amount * 100;
    this.options.amount = amount.toString();
    this.paymentService.getOrderId(this.options.amount);
    this.orderSubscription = this.paymentService.orderSubject.subscribe((orderId) => {
      this.options.order_id = orderId;
      this.rzp = new this.paymentService.nativeWindow.Razorpay(this.options);
      this.rzp.open();
      this.bottomSheet.dismiss();
    });
  }
}
