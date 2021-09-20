import { TemplateRef } from '@angular/core';

/**
 * Options passed to {@link ComponentLoader.show}.
 * 
 * @internal
 */
export class ComponentLoaderOptions {
  /**
   * The content to be drawn inside `<ng-content>` of `ComponentLoader` attached component.
	 * @remarks
	 * `content` can be `Component` , `TemplateRef` or `String`.
   */
  content?: string | TemplateRef<unknown>;
  /**
   * The data to be passed to view for `TemplateRef` case.
   */
  context?: unknown;
  /**
   * Initial data to be passed to `content` for `Component` case.
   */
  initialState?: unknown;
  /**
   * Other properties passed to attached component.
   */
  [key: string]: unknown;
  /**
   * id` - The id of the attached component ref.
   */
  id?: number | string;
}
