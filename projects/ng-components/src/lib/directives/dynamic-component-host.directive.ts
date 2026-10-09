import { Directive, ViewContainerRef, input } from '@angular/core';

@Directive({ selector: '[appDynamicComponentHost]' })
export class DynamicComponentHostDirective {
  readonly hostName = input<string>('');
  constructor(public viewContainerRef: ViewContainerRef) {}
}