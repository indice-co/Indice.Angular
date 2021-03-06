import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({ selector: 'lib-list-tile', template: '<ng-content></ng-content>' })
export class ListTileComponent{
  @ContentChild(TemplateRef) template: any | null = null;
  constructor() {
  }
}
