import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_NOTIFICATIONS } from 'projects/ng-components/src/lib/tokens';
import { IAppNotifications } from 'projects/ng-components/src/lib/types';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  public items: any[] = [];
  public count =  0;
  public unreadCount =  0;
  constructor(@Inject(Router) private router: Router, @Inject(APP_NOTIFICATIONS) public notifications: IAppNotifications ) { }

  ngOnInit(): void {
    this.notifications.messages.subscribe(result => {
      this.items = result.items;
    });
  }

}
