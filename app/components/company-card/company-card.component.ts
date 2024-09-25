import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss'],
})
export class CompanyCardComponent implements OnInit {
  @Input() company!: Company;

  breakpoint$: Observable<Breakpoint>;
  isSmall!: boolean;
  noOfRegisteredEmployees: any;

  constructor(public store: Store<{ breakpoint: Breakpoint }>) {
    this.breakpoint$ = store.select('breakpoint');
    this.breakpoint$.subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });
  }

  ngOnInit(): void {}
}
