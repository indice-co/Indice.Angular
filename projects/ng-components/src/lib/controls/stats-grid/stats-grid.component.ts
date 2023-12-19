import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'lib-stats-grid',
  templateUrl: './stats-grid.component.html'
})
export class StatsGridComponent implements OnChanges {
  @Input() busy = false;
  @Input() count = 6;
  public loader: any[] = ['', '', '', '', '', ''];
  @Input() mode: string = 'normal';
  @Input() labels: string[] = ['Online', 'Offline', 'Faulted'];
  @Input() values: number[] = [10, 20, 30];
  @Input() colors: string[] = [
    'rgb(53, 177, 201, 0.6)',
    'rgb(168, 162, 158, 0.2)',
    'rgb(233, 96, 96, 0.8)'
  ];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.count) {
      this.loader = [];
      for (let i = 0; i <= this.count; i++) {
        this.loader.push('');
      }
    }
  }

  public isNumber(value: any): boolean {
    return !isNaN(Number(value));;
  }
}
