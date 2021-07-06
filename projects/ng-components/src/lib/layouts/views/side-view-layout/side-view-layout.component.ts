import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'lib-side-view-layout',
  templateUrl: './side-view-layout.component.html'
})
export class SideViewLayoutComponent implements OnInit {
  @Input() title: string | null = 'Πληροφορίες';
  @Input() showActions = true;
  // @Output() close = new EventEmitter<any>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();
  @Output() ok: EventEmitter<boolean>  = new EventEmitter();

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  public closeSidePane(): void {
    this.location.back();
  }

  public emitClose(): void {
    this.cancel.emit(false);
    this.closeSidePane();
  }

  public emitCancel(): void {
    this.cancel.emit(false);
    this.closeSidePane();
  }

  public emitOK(): void {
    this.ok.emit(true);
  }

}
