import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidenavOpen: any;
  verificationStatus: String;
  hasBackdrop: any;
  sidenavMode: any;
  breakpoint$: Observable<Breakpoint>;
  companyPage: any;
  adminPage: any;
  employeePage: any;
  companyRegisterPage: any;
  currentRoute!: string;

  constructor(
    public store: Store<{
      breakpoint: Breakpoint;
      route: string;
      menu: boolean;
    }>
  ) {
    this.breakpoint$ = store.select('breakpoint');

    this.breakpoint$.subscribe((breakpoint) => {
      if (breakpoint.isSm || breakpoint.isXs) {
        this.hasBackdrop = true;
        this.sidenavMode = 'over';
      } else {
        this.hasBackdrop = false;
        this.sidenavMode = 'side';
      }

      this.store.select('route').subscribe((route) => {
        if (route === '/company/signup' || route === '/admin/login') {
          this.sidenavOpen = false;
        } else {
          if (breakpoint.isSm || breakpoint.isXs) {
            this.sidenavOpen = false;
          } else {
            this.sidenavOpen = true;
          }
        }
        this.currentRoute = route;
      });
    });

    this.store.select('menu').subscribe((menu) => (this.sidenavOpen = menu));

    this.verificationStatus = 'verified';
  }

  ngOnInit(): void {}
}
