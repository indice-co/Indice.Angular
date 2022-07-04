import { Inject, Injectable } from '@angular/core';

import { Profile, SignoutResponse, User, UserManager } from 'oidc-client';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTH_SETTINGS } from './tokens';
import { IAuthSettings, SignInRedirectOptions } from './types';

/** https://github.com/IdentityModel/oidc-client-js/wiki */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User = null as any;
  private _userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(@Inject(AUTH_SETTINGS) authSettings: IAuthSettings) {
    this._userManager = new UserManager(authSettings);
    this.loadUser().subscribe();
    this._userManager.events.addUserLoaded((user: User) => this._user = user);
    this._userManager.events.addAccessTokenExpiring(() => this.signinSilent().subscribe((user: User) => this._user = user, (error: any) => throwError(error)));
    this._userManager.events.addUserSignedOut(() => this.removeUser());
  }

  public user$ = this._userSubject.asObservable();

  public loadUser(): Observable<User | null> {
    return from(this._userManager.getUser()).pipe(map((user: User | null) => {
      if (user) {
        this._user = user;
        this._userSubject.next(user);
        this._userSubject.complete();
      }
      return user;
    }));
  }

  public isLoggedIn(): Observable<boolean> {
    return from(this._userManager.getUser()).pipe(map<User | null, boolean>((user: User | null) => user ? true : false));
  }

  public getUserProfile(): Profile | undefined {
    return this._user?.profile || undefined;
  }

  public getEmail(): string | undefined {
    return this.getUserProfile()?.email;
  }

  public getSubjectId(): string | undefined {
    return this.getUserProfile()?.sub;
  }

  public getFullName(): string | undefined {
    const userProfile = this.getUserProfile();
    if (userProfile?.given_name && userProfile?.family_name) {
      return `${userProfile.given_name} ${userProfile.family_name}`;
    }
    return undefined;
  }

  public getUserName(): string | undefined {
    return this.getUserProfile()?.name;
  }

  public getDisplayName(): string {
    return this.getFullName() || this.getEmail() || this.getUserName() || '';
  }

  public getCurrentUser(): User {
    return this._user;
  }

  public isAdmin(): boolean {
    return this.getUserProfile()?.admin === true || this.hasRole('Administrator');
  }

  public getAuthorizationHeaderValue(): string {
    if (this._user) {
      return `${this._user.token_type} ${this._user.access_token}`;
    }
    return '';
  }

  public getAccessTokenValue(): string {
    if (this._user) {
      return `${this._user.access_token}`;
    }
    return '';
  }

  public signoutRedirect(): void {
    this._userManager.signoutRedirect();
  }

  public removeUser(): Observable<void> {
    this._userManager.clearStaleState();
    return from(this._userManager.removeUser());
  }

  public signoutRedirectCallback(): Observable<SignoutResponse> {
    return from(this._userManager.signoutRedirectCallback()).pipe(map((response: SignoutResponse) => {
      this._user = null as any;
      this._userSubject.next(null);
      this._userSubject.complete();
      return response;
    }, (error: any) => {
      throwError(error);
    }));
  }

  public signinRedirect(signInRedirectOptions?: SignInRedirectOptions): void {
    const authorizeArgs: any = {};
    if (signInRedirectOptions?.location) {
      authorizeArgs['data'] = { url: location };
    }
    if (signInRedirectOptions?.promptRegister === true) {
      authorizeArgs['extraQueryParams'] = { operation: 'register' };
    }
    if (signInRedirectOptions?.tenant) {
      authorizeArgs['acr_values'] = `tenant:${signInRedirectOptions.tenant}`;
    }
    this._userManager
      .signinRedirect(authorizeArgs)
      .catch((error: any) => { });
  }

  public signinRedirectCallback(): Observable<User> {
    return from(this._userManager.signinRedirectCallback()).pipe(map((user: User) => {
      this._user = user;
      this._userSubject.next(this._user);
      this._userSubject.complete();
      return user;
    }, (error: any) => {
      throwError(error);
      return null;
    }));
  }

  public signinSilent(): Observable<User> {
    return from(this._userManager.signinSilent()).pipe(map((user: User) => {
      this._userSubject.next(user);
      this._userSubject.complete();
      return user;
    }));
  }

  public signinSilentCallback(): Observable<User | undefined> {
    return from(this._userManager.signinSilentCallback()).pipe(map((user: User | undefined) => {
      if (user) {
        this._user = user;
      }
      this._userSubject.next(this._user);
      this._userSubject.complete();
      return user;
    }, (error: any) => {
      throwError(error);
      return null;
    }));
  }

  private hasRole(roleName: string): boolean {
    const roleClaim = this.getUserProfile()?.role as string;
    if (roleClaim && Array.isArray(roleClaim)) {
      const roles = Array.from(roleClaim);
      return roles.indexOf(roleName) !== -1;
    }
    return roleClaim === roleName;
  }
}
