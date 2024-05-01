import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'lib-progress-bar',
  templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent implements OnChanges {
  @Input() value: number = 0;
  @Input('value-text') valueText: string | undefined;
  @Input() total: number = 0;
  @Input('total-text') totalText: string | undefined;
  @Input() text: string | undefined = undefined;
  @Input() busy: boolean = false;
  public percentage: number = 0;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value || changes.total) {
      this.calcPercentage();
    }
  }

  private calcPercentage() {
    if (this.total > 0) {
      this.percentage = (this.value / this.total) * 100;
    } else {
      this.percentage = 0;
    }
  }
}
