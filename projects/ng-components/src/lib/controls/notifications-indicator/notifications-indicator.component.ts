import { IAppNotifications, NavLink } from './../../types';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { APP_LINKS, APP_NOTIFICATIONS } from '../../tokens';

@Component({
  selector: 'lib-notifications-indicator',
  templateUrl: './notifications-indicator.component.html'
})
export class NotificationsIndicatorComponent implements OnInit, OnDestroy {

  public menuExpanded = false;
  public unreadCount = 0;
  public items: any[] = [];
  public allNotificationsLink?: NavLink;
  private notificationsSub$: Subscription | undefined;
  private inboxAction: any | undefined = undefined;
  public newArrival = false;
  constructor(@Inject(APP_NOTIFICATIONS) public notifications: IAppNotifications, @Inject(APP_LINKS) public links: any) { }

  ngOnDestroy(): void {
    if (this.notificationsSub$) {
      this.notificationsSub$.unsubscribe();
    }
  }

  ngOnInit(): void {
    (this.links['notifications'] as Observable<NavLink>).subscribe(notificationsLink => {
      this.allNotificationsLink = notificationsLink;
    });
    this.notificationsSub$ = this.notifications.messages.subscribe(result => {
      if (result.items){
        this.newArrival = true;
        this.unreadCount = result.count;
        this.items = result.items;
        setTimeout( () => { this.newArrival = false; }, 1000 );
      }
    });
  }

  public doInboxAction(): void {
    if (this.notifications.inboxAction) {
      this.notifications.inboxAction();
    } else {
      this.menuExpanded = !this.menuExpanded;
    }
    this.unreadCount = 0;
  }

  public removeItem(index:number){
    this.items.splice(index,1);
  }

    // this.notificationsSub$ = this.links.notifications?.pipe(map(result => {
    //   this.allItemsLink = result.allNotifications;
    //   this.items = result.items;
    //   this.unreadCount = result.count;
    // }));

    // [this.notificationsLinksPath] as Observable<NotificationNavLink[]>;
    // this.allNotificationsLink = this.links[this.allNotificationsLinkPath] as Observable<NavLink>;
    // this.unreadNotificationsCountObs = this.links[this.notificationsCounterLinksPath] as Observable<number>;
    // this.getUnreadNotificationsCount();

  // tslint:disable-next-line:typedef
  public onClickOutside($event: any) {
    this.menuExpanded = false;
  }

}
