import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { Toast } from '../../types';
import { ToasterComponent } from './toaster.component';

@Component({
    selector: 'lib-toaster-container',
    templateUrl: './toaster-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ToasterComponent]
})
export class ToasterContainerComponent implements OnInit {

  toasts: Toast[] = [];

  constructor(private toaster: ToasterService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.toaster.toast$
      .subscribe(toast => {
        this.toasts = [toast, ...this.toasts];
        setTimeout(() => {
          this.toasts.pop();
          this.cdr.markForCheck();
        }, toast.delay || 6000);
        this.cdr.markForCheck();
      });
  }

  remove(index: number): void {
    this.toasts = this.toasts.slice(0, index).concat(this.toasts.slice(index + 1));
  }

}
