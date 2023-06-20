import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({selector: 'lib-content-tile-header', template: '<ng-content></ng-content>'})
export class ContentTileHeaderComponent {
  @ContentChild(TemplateRef) template: any | undefined = undefined;
  constructor() { }
}
