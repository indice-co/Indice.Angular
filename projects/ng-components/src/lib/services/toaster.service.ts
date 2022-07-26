import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Toast, ToastType, NULL_TOAST } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _subject: BehaviorSubject<Toast>;

  constructor() {
    this._subject = new BehaviorSubject<Toast>(NULL_TOAST);
    this.toast$ = this
      ._subject
      .asObservable()
      .pipe(filter((toast: Toast) => toast !== null && toast.title !== NULL_TOAST.title));
  }
  
  public toast$: Observable<Toast>;

  public show(type: ToastType, title?: string, body?: string, delay?: number): void {
    this._subject.next({ type, title, body, delay } as Toast);
  }
}
