import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { Toast } from '../../types';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf } from '@angular/common';

@Component({
    selector: 'lib-toaster',
    templateUrl: './toaster.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf]
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

  public closeToast(index: number): void {
    this.closed = true;
    setTimeout(() => this.remove.emit(index), 100);
  }
}
