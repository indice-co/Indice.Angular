import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@indice/ng-auth';

@Component({
  selector: 'lib-auth-callback',
  templateUrl: './auth-callback.component.html'
})
export class AuthCallbackComponent implements OnInit {
  constructor(@Inject(AuthService) private authService: AuthService, private router: Router) { }

  public status = 'παρακαλώ περιμένετε...';

  public ngOnInit(): void {
    this.authService.signinRedirectCallback().subscribe((user) => {
      if (user) {
        this.router.navigateByUrl(user.url_state || '/');
      }
    });
  }
}
