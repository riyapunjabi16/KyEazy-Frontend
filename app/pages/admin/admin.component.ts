import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  loginService: LoginService;
  constructor(private router: Router, loginService: LoginService) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
    if (
      this.loginService.isLoggedIn() &&
      localStorage.getItem('userType') === 'ADMIN'
    ) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/admin/login']);
    }
  }
}
