import { Router } from '@angular/router';
import { IAppNotifications, IResultSet, NavLink } from './../../../../ng-components/src/lib/types';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppNotificationsService implements IAppNotifications {

  // tslint:disable-next-line:variable-name
  private messages$: BehaviorSubject<any> = new BehaviorSubject({items: [], count: 0});
  private monitoring = false;
  private statusTimer$: any;
  private messagesValue: IResultSet<NavLink> = {items: [], count: 0 };

  constructor(@Inject(Router) private router: Router) {
    console.log('AppNotificationsService instatiated');
  }

  public get messages(): Observable<IResultSet<NavLink>> {
    if (!this.monitoring) {
      this.startMonitoring();
    }
    return this.messages$.asObservable();
  }

  public startMonitoring(): void {
    this.monitoring = true;
    this.statusTimer$ = timer(100, 10000).subscribe(response => {
      // do your service call and map your response to populate the items collection and count
      if (this.messagesValue.items.length < 20) {
        const id = this.messagesValue.items.length + 1;
        const msg = {id, title: `Message ${id}`, text: `Body of message ${id}`, date: new Date(), isRead: false};
        this.messagesValue.items.push(new NavLink(msg.title, `inbox/${id}`, false, false, undefined, msg));
        this.messagesValue.count = this.messagesValue.items.filter(m => !m.data.isRead).length;
        this.messages$.next(this.messagesValue);
      }
    });
  }

  public refresh(): void {
    this.messagesValue.count = this.messagesValue.items.filter(m => !m.data.isRead).length;
    this.messages$.next(this.messagesValue);
  }

  public getMessage(findPredicate: (value: any, index: number, obj: any[]) => any): any | undefined {
    const item = this.messagesValue.items.find(findPredicate);
    console.log('getMessage', item);
    return item;
  }

  // public inboxAction(): void {
  //   this.router?.navigate(['', { outlets: { rightpane: 'samples/inbox' } }]);
  // }

}
