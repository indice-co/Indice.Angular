import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toast } from '../../types';

@Component({
  selector: 'lib-toaster',
  templateUrl: './toaster.component.html'
})
export class ToasterComponent implements OnInit {

  @Input() toast: Toast | undefined;
  @Input() i = 0;
  @Output() remove = new EventEmitter<number>();
  public isMobile = false;
  public closed = false;

  constructor() { }

  ngOnInit(): void {
    window.screen.width > 640 ? this.isMobile = false : this.isMobile = true;
  }

  public closeToast(index: number) {
    this.closed = true;
    setTimeout(() => this.remove.emit(index), 100);
  }
}
