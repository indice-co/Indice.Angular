import { Inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(@Inject(AuthService) private authService: AuthService) { }

  public canActivate(route: ActivatedRouteSnapshot | undefined, state: RouterStateSnapshot | undefined): Observable<boolean> | Promise<boolean> | boolean {
    const observable = this.authService.isLoggedIn();
    observable.subscribe((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        this.authService.signinRedirect(state?.url || undefined);
      }
    });
    return observable;
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(undefined, undefined);
  }

  public canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(undefined, undefined);
  }
}
