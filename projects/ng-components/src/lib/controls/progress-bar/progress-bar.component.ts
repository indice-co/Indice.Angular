import { Component, OnChanges, SimpleChanges, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
    selector: 'lib-progress-bar',
    templateUrl: './progress-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnChanges {
  readonly value = input<number>(0);
  readonly valueText = input<string>(undefined, { alias: "value-text" });
  readonly total = input<number>(0);
  readonly totalText = input<string>(undefined, { alias: "total-text" });
  readonly text = input<string>();
  readonly busy = input<boolean>(false);
  public percentage: number = 0;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value || changes.total) {
      this.calcPercentage();
    }
  }

  private calcPercentage() {
    if (this.total() > 0) {
      this.percentage = (this.value() / this.total()) * 100;
    } else {
      this.percentage = 0;
    }
  }
}
