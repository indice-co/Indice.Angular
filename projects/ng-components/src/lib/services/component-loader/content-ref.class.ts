import { ComponentRef, ViewRef } from '@angular/core';

/**
 * Holds information about the dynamic content.
 * @remarks
 * `ComponentRef` is undefined in the case content is of `TemplateRef` type.
 */
export class ContentRef {
  constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) {}
}
