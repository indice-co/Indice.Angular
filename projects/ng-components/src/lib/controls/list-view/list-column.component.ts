import { Component, ContentChild, Input, OnInit, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'lib-list-column', template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ListColumnComponent {
  @Input() title: string | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('full-width') fullWidth = false;
  @ContentChild(TemplateRef) template: any | null = null;
  constructor() { }
}
