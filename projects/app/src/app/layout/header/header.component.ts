// import { Component, ChangeDetectorRef, Inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '@indice/ng-auth';
// import { IAppLinks, ShellHeaderComponent } from '@indice/ng-components';
// import { APP_LINKS } from '@indice/ng-components';
// import { Observable, Subscription } from 'rxjs';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
// })
// export class HeaderComponent extends ShellHeaderComponent {
//   private headerUserSub$: Subscription | null = null;
//   private userSub$: Subscription | null = null;

//   constructor(@Inject(AuthService) protected authService: AuthService,
//               @Inject(Router) protected router: Router,
//               @Inject(APP_LINKS) public links: any,
//               private cdRef: ChangeDetectorRef) {
//     super(authService, router, links);
//   }

//   ngOnInit(): void {
//     super.ngOnInit();
//     // Subscribe to the same subject (userSubject here)
//     this.headerUserSub$ = this.userSubject.subscribe((event: any) => {
//       console.log('HeaderComponent user subscription');
//     });
//     const observable = new Observable(subscriber => {
//       subscriber.next(1);
//       subscriber.next(2);
//       subscriber.next(3);
//       setTimeout(() => {
//         subscriber.next(4);
//         subscriber.complete();
//       }, 1000);
//     });
//     // Or add a subscription to existing Subscription(userSub$ here)
//     this.userSub$?.add(observable.subscribe(num => {
//       console.log('HeaderComponent add subscription to ShellHeaderComponent user subscription');
//       console.log(num);
//     }
//     ));

//   }

//   ngOnDestroy(): void {
//     super.ngOnDestroy();
//   }

//   public onClickOutside($event: any) {
//     super.onClickOutside($event);
//   }
// }
