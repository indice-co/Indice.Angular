import { Inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(@Inject(AuthService) private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const obs = this.authService.isLoggedIn();
    obs.subscribe((result: any) => {
      if (!result) {
        this.authService.clearState();
        this.authService.startAuthentication({ url: state.url });
      }
    }, err => {
      this.authService.clearState();
    });
    return obs;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const obs = this.authService.isLoggedIn();
    obs.subscribe((result: any) => {
      if (!result) {
        this.authService.clearState();
        this.authService.startAuthentication({ url: state.url });
      }
    }, err => {
      this.authService.clearState();
    });
    return obs;
  }
}
