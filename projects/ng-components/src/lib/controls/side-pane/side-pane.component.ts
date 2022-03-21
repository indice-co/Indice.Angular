import { SidePaneOverlayType, SidePaneSize } from './../../types';
import { Router } from '@angular/router';
import { Component, Input, OnInit, OnDestroy, Inject, EventEmitter, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'lib-side-pane',
  templateUrl: './side-pane.component.html'
})
export class SidePaneComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('visible') showPane = false;
  public sizeContainerStyle = 'side-pane-box-size';
  public overlayStyle = 'side-pane-overlay';
  @Output() onComplete: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private router: Router, @Inject(DOCUMENT) private document: any,) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void  {
  }

  public onSidePaneActivated(component: any): void  {
    this.document.body.classList.add('modal-active');
    let sizeStyleSuffix = '';
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      if (state.paneSize) {
        if (state.paneSize === SidePaneSize.Small25) {
          sizeStyleSuffix = '-25';
        } else if (state.paneSize === SidePaneSize.Medium50) {
          sizeStyleSuffix = '-50';
        } else if (state.paneSize === SidePaneSize.Large75) {
          sizeStyleSuffix = '-75';
        }
      }
      if (state.paneOverlay) {
        if (state.paneOverlay === SidePaneOverlayType.None)  {
          this.overlayStyle = 'side-pane-overlay-opacity-0';
        } else if (state.paneOverlay === SidePaneOverlayType.Dark) {
          this.overlayStyle = 'side-pane-overlay-opacity-50';
        } else {
          this.overlayStyle = 'side-pane-overlay';
        }
      }
    }
    this.sizeContainerStyle = `side-pane-box-size${sizeStyleSuffix}`;
    this.showPane = true;
  }

  public onSidePaneDeactivated($event: any): void  {  
    this.document.body.classList.remove('modal-active');
    this.showPane = false;
    this.onComplete.emit(true);
  }

}
