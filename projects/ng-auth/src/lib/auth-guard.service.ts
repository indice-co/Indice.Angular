import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {
  constructor(@Inject(AuthService) private authService: AuthService) { }

  public canActivate(route: ActivatedRouteSnapshot | undefined, state: RouterStateSnapshot | undefined): Observable<boolean> | Promise<boolean> | boolean {
    const observable = this.authService.isLoggedIn();
    observable.subscribe((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        this.authService.signinRedirect({
          location: state?.url || undefined,
          promptRegister: route?.data?.register || route?.firstChild?.data?.register || false,
          tenant: route?.params['tenantAlias'] ?? 'localhost'
        });
      }
    });
    return observable;
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  public canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(undefined, undefined);
  }
}
