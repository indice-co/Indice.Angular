import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'lib-side-view-layout',
    templateUrl: './side-view-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideViewLayoutComponent implements OnInit {
  readonly title = input<string | null>('Πληροφορίες');
  readonly showActions = input(true);
  readonly disabled = input(false);
   readonly returnPath = input<string>(undefined, { alias: "return-path" });
   readonly okLabel = input('Αποθήκευση', { alias: "ok-label" });
   readonly okShow = input(true, { alias: "ok-show" });
   readonly closeOnOk = input(true, { alias: "ok-close-dialog" });
   readonly cancelLabel = input('Ακύρωση', { alias: "cancel-label" });
   readonly cancelShow = input(true, { alias: "cancel-show" });
   readonly forceLocationBack = input(false, { alias: "force-location-back" });
  readonly redirectOnClose = input(true, { alias: "redirect-on-close" });
  // @Output() close = new EventEmitter<any>();
  readonly cancel = output<boolean>();
  readonly ok = output<boolean>();

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  public closeSidePane(): void {
    if (this.returnPath()) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigateByUrl(this.returnPath() || '/'));
    } else {
      const forceLocationBack = this.forceLocationBack();
      if ((this.router.url.split('/(')[0] !== this.router.url) && !forceLocationBack) {
        this.router.navigateByUrl(this.router.url.split('/(')[0]);
      } else if ((this.router.url.split('(')[0] !== this.router.url) && !forceLocationBack) {
        this.router.navigateByUrl(this.router.url.split('(')[0]);
      } else {
        this.location.back();
      }
    }
  }

  public emitClose(): void {
    this.cancel.emit(false);
    if(this.redirectOnClose()) {
      this.closeSidePane();
    }
  }

  public emitCancel(): void {
    this.cancel.emit(false);
    if(this.redirectOnClose()) {
      this.closeSidePane();
    }
  }

  public emitOK(): void {
    this.ok.emit(true);
    if (this.closeOnOk() && this.redirectOnClose()) {
      this.closeSidePane();
    }
  }

}
