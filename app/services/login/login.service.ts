import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  doLogin(credentials: Credentials) {
    return this.httpClient.post(`${environment.backendURL}/token`, credentials);
  }

  loginUser(token: string, id: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('Id', id);
    return true;
  }

  setUserId(id: string) {
    localStorage.setItem('Id', id);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    let token = localStorage['token'];
    if (token == null || token == undefined || token === '') {
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('Id');
    this.router.navigate(['/']);
  }
}
