import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'lib-side-view-layout',
  templateUrl: './side-view-layout.component.html'
})
export class SideViewLayoutComponent implements OnInit {
  @Input() title: string | null = 'Πληροφορίες';
  @Input() showActions = true;
  @Input() disabled = false;
  // tslint:disable-next-line:no-input-rename
  @Input('return-path') returnPath: string | undefined;
  // tslint:disable-next-line:no-input-rename
  @Input('ok-label') okLabel = 'Αποθήκευση';
  // tslint:disable-next-line:no-input-rename
  @Input('ok-show') okShow = true;
  // tslint:disable-next-line:no-input-rename
  @Input('ok-close-dialog') closeOnOk = true;
  // tslint:disable-next-line:no-input-rename
  @Input('cancel-label') cancelLabel = 'Ακύρωση';
  // tslint:disable-next-line:no-input-rename
  @Input('cancel-show') cancelShow = true;
  // tslint:disable-next-line:no-input-rename
  @Input('force-location-back') forceLocationBack = false;
  @Input('redirect-on-close') redirectOnClose = true;
  // @Output() close = new EventEmitter<any>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();
  @Output() ok: EventEmitter<boolean> = new EventEmitter();

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  public closeSidePane(): void {
    if (this.returnPath) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigateByUrl(this.returnPath || '/'));
    } else {
      if ((this.router.url.split('/(')[0] !== this.router.url) && !this.forceLocationBack) {
        this.router.navigateByUrl(this.router.url.split('/(')[0]);
      } else if ((this.router.url.split('(')[0] !== this.router.url) && !this.forceLocationBack) {
        this.router.navigateByUrl(this.router.url.split('(')[0]);
      } else {
        this.location.back();
      }
    }
  }

  public emitClose(): void {
    this.cancel.emit(false);
    if(this.redirectOnClose) {
      this.closeSidePane();
    }
  }

  public emitCancel(): void {
    this.cancel.emit(false);
    if(this.redirectOnClose) {
      this.closeSidePane();
    }
  }

  public emitOK(): void {
    this.ok.emit(true);
    if (this.closeOnOk && this.redirectOnClose) {
      this.closeSidePane();
    }
  }

}
