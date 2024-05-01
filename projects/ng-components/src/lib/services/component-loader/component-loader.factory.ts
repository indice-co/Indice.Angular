import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { ComponentLoader } from './component-loader.class';

/**
 * Use to create instances of {@link ComponentLoader}.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class ComponentLoaderFactory {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef
  ) {}

  /**
   * Returns a new instance of {@link ComponentLoader}
   * @param viewContainerRef - The view container the dynamic content will be attached to.
   * @returns A new instance of {@link ComponentLoader}.
   *
   * @public
   */
  createLoader<T extends object>(viewContainerRef?: ViewContainerRef): ComponentLoader<T> {
    return new ComponentLoader<T>(viewContainerRef, this.componentFactoryResolver, this.applicationRef, this.injector);
  }
}
