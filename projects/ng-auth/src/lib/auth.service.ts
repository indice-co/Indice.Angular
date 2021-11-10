import { Inject, Injectable } from '@angular/core';

import { Profile, SignoutResponse, User, UserManager } from 'oidc-client';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTH_SETTINGS } from './tokens';
import { IAuthSettings } from './types';

/** https://github.com/IdentityModel/oidc-client-js/wiki */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager: UserManager;
  private user: User = null as any;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(@Inject(AUTH_SETTINGS) authSettings: IAuthSettings) {
    this.userManager = new UserManager(authSettings);
    this.loadUser().subscribe();
    this.userManager.events.addUserLoaded((user: User) => this.user = user);
    this.userManager.events.addAccessTokenExpiring(() => this.signinSilent().subscribe((user: User) => this.user = user, (error: any) => throwError(error)));
    this.userManager.events.addUserSignedOut(() => this.removeUser());
  }

  public user$ = this.userSubject.asObservable();

  public loadUser(): Observable<User | null> {
    return from(this.userManager.getUser()).pipe(map((user: User | null) => {
      if (user) {
        this.user = user;
        this.userSubject.next(user);
        this.userSubject.complete();
      }
      return user;
    }));
  }

  public isLoggedIn(): Observable<boolean> {
    return from(this.userManager.getUser()).pipe(map<User | null, boolean>((user: User | null) => user ? true : false));
  }

  public getUserProfile(): Profile | undefined {
    return this.user?.profile || undefined;
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
    return this.user;
  }

  public isAdmin(): boolean {
    return this.getUserProfile()?.admin === true || this.hasRole('Administrator');
  }

  public getAuthorizationHeaderValue(): string {
    if (this.user) {
      return `${this.user.token_type} ${this.user.access_token}`;
    }
    return '';
  }

  public signoutRedirect(): void {
    this.userManager.signoutRedirect();
  }

  public removeUser(): Observable<void> {
    this.userManager.clearStaleState();
    return from(this.userManager.removeUser());
  }

  public signoutRedirectCallback(): Observable<SignoutResponse> {
    return from(this.userManager.signoutRedirectCallback()).pipe(map((response: SignoutResponse) => {
      this.user = null as any;
      this.userSubject.next(null);
      this.userSubject.complete();
      return response;
    }, (error: any) => {
      throwError(error);
    }));
  }

  public signinRedirect(location?: string | undefined): void {
    this.userManager
      .signinRedirect({ data: { url: location || '' } })
      .catch((error: any) => { });
  }

  public signinRedirectCallback(): Observable<User> {
    return from(this.userManager.signinRedirectCallback()).pipe(map((user: User) => {
      this.user = user;
      this.userSubject.next(this.user);
      this.userSubject.complete();
      return user;
    }, (error: any) => {
      throwError(error);
      return null;
    }));
  }

  public signinSilent(): Observable<User> {
    return from(this.userManager.signinSilent()).pipe(map((user: User) => {
      this.userSubject.next(user);
      this.userSubject.complete();
      return user;
    }));
  }

  public signinSilentCallback(): Observable<User | undefined> {
    return from(this.userManager.signinSilentCallback()).pipe(map((user: User | undefined) => {
      if (user) {
        this.user = user;
      }
      this.userSubject.next(this.user);
      this.userSubject.complete();
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
