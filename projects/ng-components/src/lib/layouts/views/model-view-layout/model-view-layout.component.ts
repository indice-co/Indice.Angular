import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HeaderMetaItem } from '../../../types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-model-view-layout',
  templateUrl: './model-view-layout.component.html'
})
export class ModelViewLayoutComponent implements OnInit {
  public showRightPaneSM = false;
  @Input() title = 'no title';
  // tslint:disable-next-line:no-input-rename
  @Input('primary-links') primary: { text: string, link: string }[] | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('secondary-links') secondary: { text: string, link: string }[] | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('meta-items') metaItems: HeaderMetaItem[] | null = [
    // { key: 'test', icon: Icons.Badges, text: 'βρέθηκαν 200 αποτελέσματα' }
  ];
  constructor( private location: Location) { }

  ngOnInit(): void {
  }

  public onSidePaneActivated($event: any): void  {
    this.showRightPaneSM = true;
  }

  public onSidePaneDeactivated($event: any): void  {
    this.showRightPaneSM = false;
  }

  public closeSidePane(): void {
    this.location.back();
  }
}
