import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@indice/ng-auth';
import { ShellHeaderComponent } from '@indice/ng-components'
import { APP_LINKS } from '@indice/ng-components';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent extends ShellHeaderComponent {
  private headerUserSub$: Subscription | null = null;
  constructor(authService: AuthService, router: Router, private cdRef: ChangeDetectorRef) {
    super(authService, router, APP_LINKS);
  }

  ngOnInit() {
    super.ngOnInit();
    //Subscribe to the same subject (userSubject here)
    this.headerUserSub$ = this.userSubject.subscribe(event => {
      console.log('HeaderComponent user subscription');
    });
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });
    //Or add a subscription to existing Subscription(userSub$ here)
    this.userSub$?.add(observable.subscribe(num => {
      console.log('HeaderComponent add subscription to ShellHeaderComponent user subscription');
      console.log(num);
    }
    ));

  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  public onClickOutside($event: any) {
    super.onClickOutside($event);
  }
}
