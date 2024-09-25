import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breakpoint } from 'src/app/models/breakpoint.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() pieChartData: any;
  gradient: boolean = true;
  showAdvanceLegend: boolean = true;
  chartView: any = [400, 300];
  legendView: any = [500, 300];

  showNormalLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  breakpoint$: Observable<Breakpoint>;
  isSmall!: boolean;

  legendPosition: any = 'below';
  colorScheme: any = {
    domain: ['slategrey', 'green', 'red', '#FC9A1D', '#FF8C67'],
  };

  constructor(store: Store<{ breakpoint: Breakpoint }>) {
    this.breakpoint$ = store.select('breakpoint');
    this.breakpoint$.subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.isSmall = true;
        this.chartView = [340, 300];
        this.legendView = [280, 300];
      } else {
        this.isSmall = false;
        this.chartView = [400, 300];
        this.legendView = [500, 300];
      }
    });
  }

  ngOnInit(): void {}

  onSelect(data: any): void {}

  onActivate(data: any): void {}

  onDeactivate(data: any): void {}
}
