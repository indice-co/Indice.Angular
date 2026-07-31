import { Component, ContentChild, Input, OnInit, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'lib-list-details-section', template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.Eager
})
export class ListDetailsSectionComponent{
  @ContentChild(TemplateRef) template: any | null = null;
  constructor() {
  }
}
