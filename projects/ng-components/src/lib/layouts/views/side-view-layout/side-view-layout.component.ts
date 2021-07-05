import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'lib-side-view-layout',
  templateUrl: './side-view-layout.component.html'
})
export class SideViewLayoutComponent implements OnInit {
  @Input() title: string | null = 'Πληροφορίες';
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = false;
  @Output() close = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() ok = new EventEmitter<any>();

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  public closeSidePane(): void {
    this.location.back();
  }

  public emitClose(): void {
    this.closeSidePane();
  }

  public emitCancel(): void {
    this.closeSidePane();
  }

  public emitOK(): void {
    this.ok.emit();
  }

}
