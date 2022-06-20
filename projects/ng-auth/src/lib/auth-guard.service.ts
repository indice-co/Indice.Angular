import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(@Inject(AuthService) private authService: AuthService) { }

  // tslint:disable-next-line:max-line-length
  public canActivate(route: ActivatedRouteSnapshot | undefined, state: RouterStateSnapshot | undefined): Observable<boolean> | Promise<boolean> | boolean {
    const observable = this.authService.isLoggedIn();
    observable.subscribe((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        this.authService.signinRedirect(state?.url || undefined, route?.data?.register || route?.firstChild?.data?.register || false);
      }
    });
    return observable;
  }

  // tslint:disable-next-line:max-line-length
  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  public canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(undefined, undefined);
  }
}
