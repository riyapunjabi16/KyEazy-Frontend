import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { barChartData } from 'src/app/models/barChartData.model';
import { Breakpoint } from 'src/app/models/breakpoint.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  barChartData!: any[];
  view: any = [900, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Companies';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Employees';
  legendTitle: string = 'Status';
  showDataLabel: boolean = false;
  legendPosition: any = 'right';
  isSmall: boolean = false;
  schemeType: any = 'ordinal';

  colorScheme: any = {
    domain: ['slategrey', 'green', 'red', '#FC9A1D'],
  };

  constructor(public store: Store<{ breakpoint: Breakpoint }>) {
    this.store.select('breakpoint').subscribe((change: Breakpoint) => {
      if (change.isXs) {
        this.legendPosition = 'below';
        this.view = [330, 300];
        this.showYAxisLabel = false;
        this.isSmall = true;
      } else if (change.isSm) {
        this.view = [600, 300];
        this.legendPosition = 'below';
        this.showYAxisLabel = true;
        this.isSmall = false;
      } else if (change.isMd) {
        this.view = [700, 400];
        this.legendPosition = 'right';
        this.showYAxisLabel = true;
        this.isSmall = false;
      } else {
        this.view = [900, 400];
        this.legendPosition = 'right';
        this.showYAxisLabel = true;
        this.isSmall = false;
      }
    });

    Object.assign(this, { barChartData });
  }

  onSelect(data: any): void {}

  onActivate(data: any): void {}

  onDeactivate(data: any): void {}

  ngOnInit(): void {}
}
