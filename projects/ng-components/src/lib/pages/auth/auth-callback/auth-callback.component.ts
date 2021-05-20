import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@indice/ng-auth';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-auth-callback',
  template: './auth-callback.component.html'
})
export class AuthCallbackComponent implements OnInit {
  public status = 'παρακαλώ περιμένετε...';

  constructor(@Inject(AuthService) private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const self = this;
    this.authService.completeAuthentication().then(() => {
      self.authService.isLoggedIn().subscribe((result: any) => {
        // i'm sorry!
        if (!result) {
          self.router.navigate(['/unauthorized']);
          return;
        }
        // did you want to go somewhere?
        const user = self.authService.currentUser();
        if (user && user.state && user.state.url) {
          // TODO: should parse this at some point :)
          // console.log('AuthCallbackComponent user state',user.state);
          self.router.navigateByUrl('/dashboard');
          return;
        } else {
          self.router.navigateByUrl('/dashboard');
          return;
        }
        // lets check your subscriptions...
        // self.status = `we're loading your subscription information, please wait...`;
        //// ok get the subscriptions for the user
        // self.appState.subscriptions.subscribe((subs) => {
        //  self.subscriptions = subs;
        //  if (subs === null || subs.length === 0) {
        //    self.router.navigate(['/new-subscription']);
        //  } else if (subs.length === 1) {
        //    self.status = `welcome ${user.profile.name}, we're loading your configuration information, please wait...`;
        //    self.selectSubscription(subs[0]);
        //  } else {
        //    self.status = `welcome ${user.profile.name}, please select a subscription to proceed...`;
        //  }
        // }, error => {
        //  self.status = `oups! an error occured, sorry about that! please try again in a while :)`;
        // });
      });
    });
  }

  //public selectSubscription(subscription: any) {
  //  this.appState.selectSubscription(subscription);
  //  this.router.navigate([subscription.homePath]);
  //}

}
