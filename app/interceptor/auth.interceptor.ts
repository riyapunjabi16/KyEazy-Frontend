import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req;

    let token = this.loginService.getToken();
    if (token != null) {
      if (localStorage.getItem('userType') === 'COMPANY')
        newReq = newReq.clone({
          setHeaders: { Authorization: `Bearer C${token}` },
        });
      if (localStorage.getItem('userType') === 'EMPLOYEE')
        newReq = newReq.clone({
          setHeaders: { Authorization: `Bearer E${token}` },
        });
      if (localStorage.getItem('userType') === 'ADMIN')
        newReq = newReq.clone({
          setHeaders: { Authorization: `Bearer A${token}` },
        });
    }
    return next.handle(newReq);
  }
}
