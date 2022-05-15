import { IAppNotifications, NavLink } from './../../types';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { APP_NOTIFICATIONS } from '../../tokens';
import { NotificationNavLink } from '../../types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lib-notifications-indicator',
  templateUrl: './notifications-indicator.component.html'
})
export class NotificationsIndicatorComponent implements OnInit, OnDestroy {

  public notificationsMenuVisible = true;
  public menuExpanded = false;
  public showNotifications = true;
  public showUserNameOnHeader = true;
  public unreadCount = 0;
  public items: any[] = [];
  private notificationsSub$: Subscription | undefined;
  private inboxAction: any | undefined = undefined;
  public newArrival = false;
  constructor(@Inject(APP_NOTIFICATIONS) public notifications: IAppNotifications) { }

  ngOnDestroy(): void {
    if (this.notificationsSub$) {
      this.notificationsSub$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.notificationsSub$ = this.notifications.messages.subscribe(result => {
      if (result.items){
        this.newArrival = true;
        this.unreadCount = result.count;
        this.items = result.items;
        setTimeout( () => { this.newArrival = false; }, 1000 );
      }
    });
  }

  public toggleMenu(): void {
    this.menuExpanded = !this.menuExpanded;
    this.unreadCount = 0;
  }

  public doInboxAction(): void {
    if (this.notifications.inboxAction) {
      this.notifications.inboxAction();
    }
    this.unreadCount = 0;
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
