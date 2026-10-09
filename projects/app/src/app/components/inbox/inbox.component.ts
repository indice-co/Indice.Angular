import { ChangeDetectorRef, Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { APP_NOTIFICATIONS, HeaderMetaItem, IAppNotifications, Icons, IResultSet, NavLink } from '@indice/ng-components';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class InboxComponent implements OnInit {
  constructor(
    @Inject(Router) private _router: Router,
    @Inject(APP_NOTIFICATIONS) private _notifications: IAppNotifications,
    private _changeDetector: ChangeDetectorRef
  ) { }

  public items: any[] = [];
  public count = 0;
  public unreadCount = 0;
  public icon = Icons.Messages;
  public meta: HeaderMetaItem[] = [];

  public ngOnInit(): void {
    this._notifications.messages.subscribe((result: IResultSet<NavLink>) => {
      this.items = result.items.sort((a: NavLink, b: NavLink) => {
        if (a.data.id > b.data.id) {
          return -1;
        } else {
          return 1;
        }
      });
      this.meta = [];
      this.meta.push({
        key: 'all',
        icon: Icons.ItemsCount,
        text: `${result.items.length}`
      });
      if (result.count > 0) {
        this.meta.push({
          key: 'unread',
          icon: Icons.MessagesUnread,
          text: `${result.count}`
        });
      }
      this._changeDetector.markForCheck();
    });
  }

  public viewInboxItem(item: any): void {
    this._router.navigate(['samples', 'inbox', item.id]);
  }
}
