import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@indice/ng-auth';

@Component({
  selector: 'lib-auth-renew',
  template: ''
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
