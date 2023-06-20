import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({selector: 'lib-content-tile-item',  template: '<ng-content></ng-content>'})
export class ContentTileItemComponent {
  @ContentChild(TemplateRef) template: any | undefined = undefined;
  constructor() { }
}
