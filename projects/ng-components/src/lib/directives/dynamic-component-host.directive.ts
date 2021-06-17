import { Directive, ViewContainerRef, Input } from '@angular/core';

@Directive({ selector: '[appDynamicComponentHost]' })
export class DynamicComponentHostDirective {
  @Input() hostName: string = '';
  constructor(public viewContainerRef: ViewContainerRef) {}
}