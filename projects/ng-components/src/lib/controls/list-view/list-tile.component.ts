import { Component, ContentChild, Input, OnInit, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'lib-list-tile', template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ListTileComponent{
  @ContentChild(TemplateRef) template: any | null = null;
  constructor() {
  }
}
