import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';


@Component({
    selector: 'lib-stats-grid',
    templateUrl: './stats-grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DecimalPipe]
})
export class StatsGridComponent implements OnChanges {
  readonly busy = input(false);
  readonly count = input(6);
  public loader: any[] = ['', '', '', '', '', ''];
  readonly mode = input<string>('normal');
  readonly labels = input<string[]>(['Online', 'Offline', 'Faulted']);
  @Input() values: number[] = [10, 20, 30];
  readonly colors = input<string[]>([
    'rgb(53, 177, 201, 0.6)',
    'rgb(168, 162, 158, 0.2)',
    'rgb(233, 96, 96, 0.8)'
]);

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.count) {
      this.loader = [];
      for (let i = 0; i <= this.count(); i++) {
        this.loader.push('');
      }
    }
  }

  public isNumber(value: any): boolean {
    return !isNaN(Number(value));;
  }
}
