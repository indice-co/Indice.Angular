import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APP_NOTIFICATIONS, IAppNotifications } from '@indice/ng-components';

@Component({
  selector: 'app-inbox-item',
  templateUrl: './inbox-item.component.html'
})
export class InboxItemComponent implements OnInit {
  public title = 'Παρακαλώ περιμένετε...';
  public id: number | undefined = undefined;
  public message: any | undefined = undefined;

  constructor(@Inject(APP_NOTIFICATIONS) public notifications: IAppNotifications, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.title = `Μύνημα ${this.id}`;
      if (this.notifications.getMessage) {
        const item = this.notifications.getMessage(m => m.data.id === this.id);
        item.data.isRead = true;
        this.message = item.data;
        if (this.notifications.refresh) {
          this.notifications.refresh();
        }
        console.log('InboxItemComponent', this.id, item);
      }
    });
  }

}
