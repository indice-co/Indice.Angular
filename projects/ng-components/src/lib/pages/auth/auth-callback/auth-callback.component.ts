import { Component, Inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@indice/ng-auth';
import { ViewLayoutComponent } from '../../../layouts/views/view-layout/view-layout.component';

@Component({
    selector: 'lib-auth-callback',
    templateUrl: './auth-callback.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ViewLayoutComponent]
})
export class AuthCallbackComponent implements OnInit {
  constructor(@Inject(AuthService) private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  public status = 'παρακαλώ περιμένετε...';

  public ngOnInit(): void {
    this.authService.signinRedirectCallback().subscribe((user) => {
      if (user) {
        this.router.navigateByUrl(user.url_state || '/');
      }
      this.cdr.markForCheck();
    });
  }
}
