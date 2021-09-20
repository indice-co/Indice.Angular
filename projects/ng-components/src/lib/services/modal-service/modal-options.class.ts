import { Injectable, InjectionToken, StaticProvider } from '@angular/core';

/**
 * Modals option can be passed to a specific modal from {@link ModalService.show} or set globbaly using the injection token {@link MODAL_CONFIG_DEFAULT_OVERRIDE}.
 * @remarks
 * Modal specific options are merged with global options.
 * @see {@link modalConfigDefaults} for defaults.
 * @public
 */
@Injectable()
export class ModalOptions<T = Record<string, unknown>> {
  /**
   *  Id for opened modal. If not set a random one is generated.
   */
  id?: number | string;
  /**
   * If static is set the modal will not close when clicking outside of modal.
   * @remarks
   * Keyboard event (escape key) stills applies. If you must get a result then also set keyboard to false.
   */
  backdrop?: boolean | 'static';
  /**
   * Closes the modal when escape key is pressed.
   */
  keyboard?: boolean;
  /**
   * Shows the modal when initialized.
   */
  show?: boolean;
  /**
   * Ignore the backdrop click. Pretty much the same as backdrop static.
   */
  ignoreBackdropClick?: boolean;
  /**
   * Css class for opened modal.
   */
  class?: string;
  /**
   * Toggle animation.
   */
  animated?: boolean;
  /**
   * Modal initial data. 
   * @remarks
   * This data must be known properties of content component.
   */
  initialState?: Partial<T>;
  /**
   * Function to intercept the closure.
   * @remarks
   * You can use to catch the close event and even prevent it from closing.
   */
  closeInterceptor?: CloseInterceptorFn;
  /**
   * Modal static providers.
   * @see {@link https://angular.io/guide/glossary#di-token | Injection Token}
   */
  providers?: StaticProvider[];
  /**
   * aria-labelledby attribute value to set on the modal window.
   */
  ariaLabelledBy?: string;
  /**
   * aria-describedby attribute value to set on the modal window.
   */
  ariaDescribedby?: string;
}

/**
 * Default option values.
 */
export const modalConfigDefaults: ModalOptions = {
  backdrop: true,
  keyboard: true,
  show: false,
  ignoreBackdropClick: false,
  class: '',
  animated: true,
  initialState: {},
  closeInterceptor: void 0,
};

/**
 * Use this injection token to set global options.
 */
export const MODAL_CONFIG_DEFAULT_OVERRIDE: InjectionToken<ModalOptions> = new InjectionToken<ModalOptions>('override-default-config');

/**
 * Close interceptor promise.
 */
export type CloseInterceptorFn = () => Promise<void>;
