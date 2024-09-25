import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionDTO } from 'src/app/models/action.model';
import { OrderDTO } from 'src/app/models/order.model';
import { PaymentHistory } from 'src/app/models/payment-history.model';
import { environment } from 'src/environments/environment';

function _window() {
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  orderId!: string;
  orderSubject: Subject<string> = new Subject();
  orders: PaymentHistory[];
  orderHistory: Subject<PaymentHistory[]> = new Subject();

  get nativeWindow(): any {
    return _window();
  }

  constructor(private httpClient: HttpClient) {
    this.orders = [{}] as PaymentHistory[];
  }

  getOrderId(amount: string) {
    this.httpClient
      .get<OrderDTO>(`${environment.backendURL}/payment/create-order/${amount}`)
      .pipe(map((response) => response as OrderDTO))
      .subscribe((response: OrderDTO) => {
        this.orderId = response.orderId;
        this.orderSubject.next(this.orderId);
      });
  }

  paymentSuccess(
    companyId: number,
    coins: number,
    orderId: string,
    paymentId: string,
    amount: number
  ) {
    return this.httpClient.get<ActionDTO>(
      `${environment.backendURL}/payment/payment-success/${companyId}/${coins}/${orderId}/${paymentId}/${amount}`
    );
  }

  getOrderHistory(id: number) {
    this.httpClient
      .get<PaymentHistory[]>(
        `${environment.backendURL}/payment/payment-history/${id}`
      )
      .pipe(map((response) => response as PaymentHistory[]))
      .subscribe((response: PaymentHistory[]) => {
        this.orders = response;
        this.orderHistory.next(this.orders);
      });
  }
}
