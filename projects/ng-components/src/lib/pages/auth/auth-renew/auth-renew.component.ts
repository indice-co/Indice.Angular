import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'ng-auth';


@Component({ selector: 'lib-auth-renew', template: ''})
export class AuthRenewComponent implements OnInit {

  constructor(@Inject(AuthService) private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // console.log('AuthRenewComponent init!!!');
    this.authService.manager.signinSilentCallback().catch(() => {
        // console.log('redirect to unauthorized!');
        this.router.navigate(['/unauthorized']);
    });
  }


}
