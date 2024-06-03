import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@indice/ng-auth';
import { APP_LINKS } from '../../tokens';
import { User } from 'oidc-client-ts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-user-profile-menu',
  templateUrl: './user-profile-menu.component.html'
})
export class UserProfileMenuComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('show-user-name') showUserName: boolean | undefined = false;
  protected userSub$: Subscription | null = null;
  protected statusSub$: Subscription | null = null;
  public user: User | null = null;
  public avatarName: string | null = null;
  public userMenuExpanded = false;

  constructor(@Inject(AuthService) protected authService: AuthService,
              @Inject(Router) protected router: Router,
              @Inject(APP_LINKS) public links: any) { }

  ngOnInit(): void {
    this.authService.loadUser().subscribe((user) => {
      this.setCurrentUser(user);
    }, error => {
      console.error(error);
    });
    // Detect user changes and display / or not user info accordingly...
    this.userSub$ = this.authService.user$.subscribe((user: any) => {
      // console.log('ShellHeaderComponent user subscription');
      this.setCurrentUser(user);
    });
  }

  public signin(event: any | null | undefined): void {
    if (event) {
      event.preventDefault();
    }
    this.authService.signinRedirect();
  }

  private setCurrentUser(user: any): void {
    this.user = user;
    if (this.user && this.user.profile) {
      this.avatarName = `${this.user.profile.given_name?.charAt(0)}${this.user.profile.family_name?.charAt(0)}`.toUpperCase();
    }
  }

  // tslint:disable-next-line:typedef
  public onClickOutside($event: any) {
    this.userMenuExpanded = false;
  }

}
