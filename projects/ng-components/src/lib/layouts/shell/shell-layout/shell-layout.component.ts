import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-shell-layout',
  templateUrl: './shell-layout.component.html'
})
export class ShellLayoutComponent implements OnInit {
  public showRightPaneSM = false;
  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {

  }

  public onSidePaneActivated($event: any): void  {
    console.log('onSidePaneActivated', $event);
    this.showRightPaneSM = true;
  }

  public onSidePaneDeactivated($event: any): void  {
    console.log('onSidePaneActivated', $event);
    this.showRightPaneSM = false;
  }

  public closeSidePane(): void {
    this.location.back();
  }

}
