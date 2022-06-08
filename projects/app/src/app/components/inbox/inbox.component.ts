import { Icons } from './../../../../../ng-components/src/lib/icons';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_NOTIFICATIONS } from 'projects/ng-components/src/lib/tokens';
import { IAppNotifications } from 'projects/ng-components/src/lib/types';
import { HeaderMetaItem } from '@indice/ng-components';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {

  public items: any[] = [];
  public count =  0;
  public unreadCount =  0;
  public icon = Icons.Messages;
  public meta: HeaderMetaItem[] = [];

  constructor(@Inject(Router) private router: Router, @Inject(APP_NOTIFICATIONS) public notifications: IAppNotifications ) { }

  ngOnInit(): void {
    this.notifications.messages.subscribe(result => {
      this.items = result.items.sort((a, b) => {
        if (a.data.id > b.data.id) {
          return -1;
        } else {
          return 1;
        }
      });
      this.meta = [];
      this.meta.push({key: 'all', icon: Icons.ItemsCount, text: `${result.items.length}` });
      if (result.count > 0) {
        this.meta.push({key: 'unread', icon: Icons.MessagesUnread, text: `${result.count}` });
      }
    });
  }

  viewInboxItem(item: any): void {
    this.router.navigate([{ outlets: { rightpane: ['samples', 'inbox', item.id]}}]);
  }

}
