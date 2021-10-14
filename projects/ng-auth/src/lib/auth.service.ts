import { Inject, Injectable, EventEmitter } from '@angular/core';
import { UserManager, UserManagerSettings, User, Profile } from 'oidc-client';
import { Observable, from, throwError, interval, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTH_SETTINGS } from './tokens';
import { IAuthSettings } from './types';

// https://www.scottbrady91.com/Angular/SPA-Authentiction-using-OpenID-Connect-Angular-CLI-and-oidc-client
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public manager: UserManager;
  userLoadededEvent: EventEmitter<User | null> = new EventEmitter<User | null>();
  public userStatus: BehaviorSubject<any> = new BehaviorSubject(null);
  private user: User | null = null;
  private silentRenewSub: any = null;
  private silentRenewInProgress = false;

  constructor(@Inject(AUTH_SETTINGS) private authSettings: IAuthSettings) {
    this.manager = new UserManager(authSettings);
    this.monitorTokenExpiration();
    this.manager.getUser().then(user => {
      this.user = user;
      this.userLoadededEvent.emit(user);
    });
    this.manager.events.addUserLoaded((user) => {
      this.user = user;
    });
  }

  async loadUser(): Promise<User | null> {
    return await this.manager.getUser().then(user => {
      this.user = user;
      return user;
    });
  }

  async removeUser(): Promise<void> {
    // console.log('auth service remove user');
    const _ = await this.manager.removeUser();
    return await this.clearState();
  }

  currentUser(): User | null {
    return this.user;
  }

  isLoggedIn(): Observable<boolean> {
    return from(this.manager.getUser()).pipe(map<User | null, boolean>((user: User | null, index: number) => {
        if (user) {
          return !user.expired;
        } else {
          return false;
        }
      }));
  }

  getProfile(): Profile | null {
    return this.user ? this.user.profile : null;
  }

  getAuthorizationHeaderValue(): string {
    if (this.user != null && this.user !== undefined) {
      return `${this.user.token_type} ${this.user.access_token}`;
    } else {
      // console.log('getAuthorizationHeaderValue returned null');
      return '';
    }
  }

  // https://github.com/IdentityModel/oidc-client-js/issues/339
  // If signinRedirect is given a parameter that has a state property,
  // the value of that property will be reconstructed later on the User object.
  startAuthentication(data?: any): Promise<void> {
    this.clearState();
    // https://github.com/IdentityModel/oidc-client-js/issues/100 (data property)
    return this.manager.signinRedirect({ data })
      .catch(error => {
        //console.log(error);
      });
  }

  completeAuthentication(): Promise<void> {
    const p = this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      this.userStatus.next(user);
    }, error => {
      throwError(error);
    });
    return p;
  }

  private monitorTokenExpiration(): void {
    if (this.silentRenewInProgress) {
      return;
    }
    const monitor = interval(20000);
    this.silentRenewSub = monitor.subscribe( i => {
      if (this.user && this.user.expires_in <= 500) {
        this.silentRenewInProgress = true;
        this.renewToken().then(renewUser => {
          this.user = renewUser;
          this.silentRenewInProgress = false;
          this.clearState();
        }, (error) => {
          //console.log('silentRenew failed', error);
          throwError(error);
        });
      }
    });
  }

  public renewToken(): Promise<User> {
    return this.manager.signinSilent();
  }

  async startSignout(): Promise<void> {
    try {
      return this.manager.signoutRedirect();
    } catch (error) {
      //console.log(error);
    }
  }

  clearState(): Promise<void> {
    // console.log('clearing stale state');
    return this.manager.clearStaleState();
  }

  completeSignout(): Promise<void> {
    return this.manager.signoutRedirectCallback().then(user => {
      this.user = null;
      this.clearState();
    }, error => {
      //console.log('completeSignout failed', error);
    });
  }

  getClientSettings(): UserManagerSettings {
    return this.authSettings;
  }
}
