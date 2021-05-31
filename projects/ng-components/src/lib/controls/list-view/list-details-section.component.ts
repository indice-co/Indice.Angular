import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({ selector: 'lib-list-details-section', template: '<ng-content></ng-content>' })
export class ListDetailsSectionComponent{
  @ContentChild(TemplateRef) template: any | null = null;
  constructor() {
  }
}
