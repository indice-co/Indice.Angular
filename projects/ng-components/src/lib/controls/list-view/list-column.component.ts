import { Component, ContentChild, OnInit, TemplateRef, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
    selector: 'lib-list-column', template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.Eager
})
export class ListColumnComponent {
  readonly title = input<string | null>(null);
  // tslint:disable-next-line:no-input-rename
  readonly fullWidth = input(false, { alias: "full-width" });
  @ContentChild(TemplateRef) template: any | null = null;
  constructor() { }
}
