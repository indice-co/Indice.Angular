import { Component, OnInit, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'lib-kpi-tile',
    templateUrl: './kpi-tile.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass]
})
export class KpiTileComponent implements OnInit {

  readonly title = input<string>();
  readonly busy = input(false);
  readonly kpi = input<any>();
  readonly hideBtn = input<boolean | undefined>(false);
  readonly actionText = input<string>('More', { alias: "action-text" });
  // tslint:disable-next-line:no-output-rename
  readonly tileAction = output<any>({ alias: 'tile-action' });
  constructor() { }

  ngOnInit(): void {
  }

  public emitTileAction($event: any): boolean {
    $event.preventDefault();
    $event.stopPropagation();
    this.tileAction.emit($event);
    return false;
  }

}
