import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { APP_NOTIFICATIONS, HeaderMetaItem, IAppNotifications, Icons } from '@indice/ng-components';

@Component({
  selector: 'app-inbox-item',
  templateUrl: './inbox-item.component.html'
})
export class InboxItemComponent implements OnInit {
  constructor(
    @Inject(APP_NOTIFICATIONS) public notifications: IAppNotifications,
    private route: ActivatedRoute
  ) { }

  public title = 'Παρακαλώ περιμένετε...';
  public id: number | undefined = undefined;
  public message: any | undefined = undefined;
  public meta: HeaderMetaItem[] = [];
  public icon = Icons.Messages;

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.title = `Μύνημα ${this.id}`;
      if (this.notifications.getMessage) {
        const item = this.notifications.getMessage(message => message.data.id === this.id);
        item.data.isRead = true;
        this.message = item.data;
        if (this.notifications.refresh) {
          this.notifications.refresh();
        }
      }
    });
  }
}
