import {
  Component,
  ChangeDetectorRef,
  Inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@indice/ng-auth';
import { ShellHeaderComponent } from '@indice/ng-components';
import { APP_LINKS } from '@indice/ng-components';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent
  extends ShellHeaderComponent
  implements OnInit, OnDestroy
{
  private headerUserSub$: Subscription | null = null;
  // private userSub$: Subscription | null = null;

  constructor(@Inject(AuthService) authService: any,
              @Inject(Router) router: Router,
              @Inject(APP_LINKS) links: any,
              private cdRef: ChangeDetectorRef) {
    super(authService, router,null, links);
  }

  ngOnInit(): void {
    super.ngOnInit();
    // Subscribe to the same subject (userSubject here)
    this.headerUserSub$ = this.userSubject.subscribe((event: any) => {
      //console.log('HeaderComponent user subscription');
    });
    const observable = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });
    // Or add a subscription to existing Subscription(userSub$ here)
    this.userSub$?.add(
      observable.subscribe((num) => {
        //   console.log('HeaderComponent add subscription to ShellHeaderComponent user subscription');
        //   console.log(num);
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
