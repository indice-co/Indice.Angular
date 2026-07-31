import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@indice/ng-auth';

@Component({
    selector: 'lib-auth-renew',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager
})
export class AuthRenewComponent implements OnInit {
  constructor(@Inject(AuthService) private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
    this.authService.signinSilentCallback().subscribe(user => {
      if (!user) {
        this.router.navigate(['/unauthorized']);
      }
    });
  }
}
