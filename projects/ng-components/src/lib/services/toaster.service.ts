import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Toast, ToastType, NULL_TOAST } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private subject: BehaviorSubject<Toast>;
  public toast$: Observable<Toast>;

  constructor() {
    this.subject = new BehaviorSubject<Toast>(NULL_TOAST);
    this.toast$ = this.subject.asObservable()
      .pipe(filter( toast => toast !== null && toast.title !== NULL_TOAST.title ));
  }

  public show(type: ToastType, title?: string, body?: string, delay?: number): void {
    this.subject.next({ type, title, body, delay } as Toast);
  }
}
