import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { Toast } from '../../types';

@Component({
    selector: 'lib-toaster-container',
    templateUrl: './toaster-container.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ToasterContainerComponent implements OnInit {

  toasts: Toast[] = [];

  constructor(private toaster: ToasterService) { }

  ngOnInit(): void {
    this.toaster.toast$
      .subscribe(toast => {
        this.toasts = [toast, ...this.toasts];
        setTimeout(() => this.toasts.pop(), toast.delay || 6000);
      });
  }

  remove(index: number): void {
    this.toasts = this.toasts.slice(0, index).concat(this.toasts.slice(index + 1));
  }

}
