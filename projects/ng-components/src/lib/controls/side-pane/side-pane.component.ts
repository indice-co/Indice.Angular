import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'lib-side-pane',
  templateUrl: './side-pane.component.html'
})
export class SidePaneComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('visible') showPane = false;
  public constainerStyle = 'side-pane-container';
  private routeSub$: Subscription | undefined;
  constructor(private route: ActivatedRoute, @Inject(DOCUMENT) private document: any,) { }

  ngOnDestroy(): void {
    if (this.routeSub$) {
      this.routeSub$.unsubscribe();
    }
  }

  ngOnInit(): void  {
  }

  public onSidePaneActivated(component: any): void  {
    console.log('SidePaneComponent:onSidePaneActivated lala');
    this.document.body.classList.add('modal-active');
    let sizeStyleSuffix = '-50';
    let positionStyleSuffix = '';
    const data = this.route.snapshot.data;
    if (data) {
      if (data.fixed) {
        positionStyleSuffix = '-fixed';
      }
      if (data.paneSize === '25%') {
        sizeStyleSuffix = '-25';
      } else if (data.paneSize === '50%') {
        sizeStyleSuffix = '-50';
      } else if (data.paneSize === '75%') {
        sizeStyleSuffix = '-75';
      }
      this.constainerStyle = `side-pane-container${positionStyleSuffix}${sizeStyleSuffix}`;
      console.log('SidePaneComponent:activateRoute.data calculated container style: ', this.constainerStyle);
    }
    this.showPane = true;
  }

  public onSidePaneDeactivated($event: any): void  {
    this.document.body.classList.remove('modal-active');
    this.showPane = false;
  }

}
