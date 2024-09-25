import { LearnMoreComponent } from './../../components/learn-more/learn-more.component';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { LoginService } from 'src/app/services/login/login.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('top')
  public top: any;
  @ViewChild('scrollToTop')
  public scrollToTop: any;
  public showScrollToTop: any;
  public isSmall: any;
  public flexDirection: any;
  public user: any;

  constructor(
    public observer: MediaObserver,
    public dialog: MatDialog,
    public store: Store<{ breakpoint: Breakpoint }>,
    public loginService: LoginService,
    private router: Router,
    public bottomSheet: MatBottomSheet
  ) {
    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs || breakpoint.isSm) {
        this.isSmall = true;
        this.flexDirection = 'column';
      } else {
        this.isSmall = false;
        this.flexDirection = 'row';
      }
    });
  }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      if (localStorage.getItem('userType') === 'ADMIN')
        this.router.navigate(['admin/dashboard']);
      if (localStorage.getItem('userType') === 'COMPANY')
        this.router.navigate(['company/dashboard']);
      if (localStorage.getItem('userType') === 'EMPLOYEE')
        this.router.navigate(['employee/dashboard']);
    }
  }

  ngAfterViewInit() {}

  showLoginModal(): void {
    this.dialog.open(ModalComponent, {
      data: {
        type: 'LOGIN',
      },
    });
  }

  ngOnDestroy(): void {}

  scrollToServices() {
    document.getElementById('service')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }

  scrollToProduct() {
    document.getElementById('product')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }

  scrollToSolutions() {
    document.getElementById('solution')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }

  getViewportSize() {
    let w = window;
    if (w.innerWidth != null)
      return {
        w: w.innerWidth,
        h: w.innerHeight,
      };
    var d = w.document;
    if (document.compatMode == 'CSS1Compat') {
      return {
        w: d.documentElement.clientWidth,
        h: d.documentElement.clientHeight,
      };
    }
    return {
      w: d.body.clientWidth,
      h: d.body.clientWidth,
    };
  }

  isInViewport(element: any) {
    const box = element.nativeElement.getBoundingClientRect();
    var height = box.height || box.bottom - box.top;
    var width = box.width || box.right - box.left;
    var viewport = this.getViewportSize();
    if (!height || !width) return false;
    if (box.top > viewport.h || box.bottom < 0) return false;
    if (box.right < 0 || box.left > viewport.w) return false;
    return true;
  }

  onScroll() {
    if (!this.isInViewport(this.top)) {
      this.showScrollToTop = true;
    } else {
      this.showScrollToTop = false;
    }
  }

  onScrollToTop() {
    document.getElementById('top')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }

  openLearnMore(companyType: string) {
    this.bottomSheet.open(LearnMoreComponent, {
      data: { companyType: companyType },
    });
  }
}
