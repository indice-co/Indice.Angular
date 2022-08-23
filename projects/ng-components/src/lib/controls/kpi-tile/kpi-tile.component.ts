import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-kpi-tile',
  templateUrl: './kpi-tile.component.html'
})
export class KpiTileComponent implements OnInit {

  @Input() title: string | undefined = undefined;
  @Input() busy = false;
  @Input() kpi: any | undefined = undefined;
  @Input() hideBtn: boolean | undefined = false;
  @Input('action-text') actionText: string = 'Περισσότερα';
  // tslint:disable-next-line:no-output-rename
  @Output('tile-action') tileAction: EventEmitter<any> = new EventEmitter<any>();
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
