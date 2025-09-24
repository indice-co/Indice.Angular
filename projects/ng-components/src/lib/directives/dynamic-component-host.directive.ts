import { Directive, ViewContainerRef, Input } from '@angular/core';

@Directive({
    selector: '[appDynamicComponentHost]',
    standalone: false
})
export class DynamicComponentHostDirective {
  @Input() hostName: string = '';
  constructor(public viewContainerRef: ViewContainerRef) {}
}