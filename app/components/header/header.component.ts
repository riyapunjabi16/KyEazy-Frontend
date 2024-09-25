import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { updateMenu } from 'src/app/redux/actions/menu.action';
import { LoginService } from 'src/app/services/login/login.service';
import { environment } from 'src/environments/environment';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company/company.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,OnDestroy {
  deviceSmall: any;
  deviceExtraSmall: any;
  isOpen: boolean = false;
  loginService: LoginService;
  isHome: any;
  backendURL = environment.backendURL;
  isAdminLogin: any;
  isCompany: boolean = false;
  isCompanySignup!: boolean;
  coins: any;
  showCoins!: boolean;
  public coinSubscription: any;
  breakpoint$: Observable<Breakpoint>;

  constructor(
    public store: Store<{
      breakpoint: Breakpoint;
      menu: boolean;
      route: string;
    }>,
    private companyService: CompanyService,
    public bottomSheet: MatBottomSheet,
    loginService: LoginService,

    private ngZone: NgZone
  ) {
    this.breakpoint$ = store.select('breakpoint');
    this.breakpoint$.subscribe((breakpoint) => {
      if (breakpoint.isSm || breakpoint.isXs) {
        this.store.dispatch(updateMenu(false));
        this.deviceSmall = true;
      } else {
        this.deviceSmall = false;
        this.store.dispatch(updateMenu(true));
      }
    });
    this.store.select('menu').subscribe((menu) => (this.isOpen = menu));
    this.loginService = loginService;

    this.store.select('route').subscribe((route) => {
      if (route === '/') this.isHome = true;
      else if (route === '/admin/login') {
        this.isAdminLogin = true;
        this.isHome = false;
      } else if (route === '/company/signup') {
        this.isCompanySignup = true;
        this.isHome = false;
      } else {
        this.isHome = false;
        this.isAdminLogin = false;
        this.isCompanySignup = false;
      }
      if (route.substring(1, 4) === 'com' && route !== '/company/signup') {
        this.showCoins = true;
      } else {
        this.showCoins = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.coinSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.coinSubscription = this.companyService.coinSubject.subscribe((coins) => {
      this.ngZone.run(() => (this.coins = coins));
    });
  }

  toggleMenu() {
    this.store.dispatch(updateMenu(!this.isOpen));
  }

  openBottomSheet() {
    this.bottomSheet.open(ContactUsComponent);
  }

  scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }

  doLogout() {
    this.loginService.logout();
  }
}
