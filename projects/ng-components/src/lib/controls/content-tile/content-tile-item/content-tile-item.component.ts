import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { ContentTileHeaderComponent } from '../content-tile-header/content-tile-header.component';

@Component({selector: 'lib-content-tile-item',  template: '<ng-content></ng-content>'})
export class ContentTileItemComponent {
  @Input() title: string | undefined;
  @ContentChild(TemplateRef) template: any | undefined = undefined;
  constructor() { }
}
