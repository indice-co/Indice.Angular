import { IAppNotifications, NavLink } from './../../types';
import { Component, Inject, OnInit, OnDestroy, ChangeDetectionStrategy, input, inject, ChangeDetectorRef } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { APP_LINKS, APP_NOTIFICATIONS } from '../../tokens';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { NgClass, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'lib-notifications-indicator',
    templateUrl: './notifications-indicator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ClickOutsideDirective, NgClass, RouterLink, DatePipe]
})
export class NotificationsIndicatorComponent implements OnInit, OnDestroy {

  public menuExpanded = false;
  public unreadCount = 0;
  public items: any[] = [];
  public allNotificationsLink?: NavLink;
  private notificationsSub$: Subscription | undefined;
  private inboxAction: any | undefined = undefined;
  readonly noNotifications = input<string>('No new notifications');
  readonly showNotificationsText = input<string>('Show all notifications');
  public newArrival = false;
  private cdr = inject(ChangeDetectorRef);
  constructor(@Inject(APP_NOTIFICATIONS) public notifications?: IAppNotifications, @Inject(APP_LINKS) public links?: any) { }

  ngOnDestroy(): void {
    if (this.notificationsSub$) {
      this.notificationsSub$.unsubscribe();
    }
  }

  ngOnInit(): void {
    if(this.links && this.links['notifications']) {
      (this.links['notifications'] as Observable<NavLink>).subscribe(notificationsLink => {
        this.allNotificationsLink = notificationsLink;
        this.cdr.markForCheck();
      });
    }
    if(this.notifications) {
      this.notificationsSub$ = this.notifications?.messages.subscribe(result => {
        if (result.items){
          this.newArrival = true;
          this.unreadCount = result.count;
          this.items = result.items;
          setTimeout( () => { this.newArrival = false; this.cdr.markForCheck(); }, 1000 );
        }
        this.cdr.markForCheck();
      });
    }
  }

  public doInboxAction(): void {
    if (this.notifications?.inboxAction) {
      this.notifications.inboxAction();
    } else {
      this.menuExpanded = !this.menuExpanded;
      this.ngOnDestroy();
      this.ngOnInit();
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

   public onClickOutside($event: any) {
    this.menuExpanded = false;
  }

}
