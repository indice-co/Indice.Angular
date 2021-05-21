import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@indice/ng-auth';


// tslint:disable-next-line:component-selector
@Component({selector: 'lib-unauthorized', templateUrl: './unauthorized.component.html'})
export class UnauthorizedComponent implements OnInit {

  constructor(@Inject(AuthService) private authService: AuthService) { }

  ngOnInit(): void {
  }

  signin(): void {
    this.authService.clearState().then( (_: any) => {
      this.authService.startSignout();
    });
  }

}
