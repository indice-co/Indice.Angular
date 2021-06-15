import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appHeaderHost]' })
export class HeaderHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}