import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterViewAction, ViewAction } from '../../../types';

@Component({
  selector: 'lib-form-layout',
  templateUrl: './form-layout.component.html'
})
export class FormLayoutComponent implements OnInit {
  @Input() title: string | null = null;
  @Input() actions: ViewAction[] | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('sub-title') subTitle: string | null = null;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAction: EventEmitter<ViewAction> = new EventEmitter<ViewAction>();
  public showRightPaneSM = false;

  constructor(private router$: Router) { }

  ngOnInit(): void {
  }

  public onSidePaneActivated($event: any): void  {
    this.showRightPaneSM = true;
  }

  public onSidePaneDeactivated($event: any): void  {
    this.showRightPaneSM = false;
  }

  public emitActionClick(action: ViewAction): void {
    this.onAction.emit(action);
  }

  public routerLinkActionClick(action: RouterViewAction | any): void {
    console.log('routerLinkActionClick', action);
    if (action.outlet) {
      const actionOutlet: string = action.outlet;
      this.router$.navigate([{ outlets: { actionOutlet: action.link } }]);
    } else {
      this.router$.navigate([action.link]);
    }
  }

}
