import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Modal class.
 * @remarks
 * This is returned from {@link ModalService.show}.
 * @public
 */
@Injectable()
export class Modal<T = any> {
  /**
   * Event that is fired when the modal behind the ref starts hiding.
   * @returns
   * Modal component instance.
   */
  onBeforeHide?: Subject<unknown>;
  /**
   * Event that is fired when the modal behind the ref finishes hiding.
   * @returns
   * An object containing the id of the closed modal and result.
   */
  onHidden?: Subject<unknown>;
  /**
   *  Id of this modal.
   */
  id?: number | string;

  /**
   * Reference to a component inside the modal. Null if modal's been created with TemplateRef.
   * @remarks
   * You can use this to do nasty stuff with opened modal instance.
   */
  content?: T;

  /**
   * Hides the modal
   * @param result - A result to the observers.
   */
  hide: (result?: any) => void = () => void 0;
  /**
   * Sets new class to modal window.
   */
  setClass: (newClass: string) => void = () => void 0;
}
