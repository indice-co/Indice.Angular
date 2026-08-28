import { Component, Inject, OnInit, ChangeDetectionStrategy, input, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ImgUserPictureDirective } from '@indice/ng-auth';
import { APP_LINKS } from '../../tokens';
import { User } from 'oidc-client-ts';
import { Subscription } from 'rxjs';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { NgClass } from '@angular/common';
import { NavLinksListComponent } from '../nav-links-list/nav-links-list.component';

@Component({
    selector: 'lib-user-profile-menu',
    templateUrl: './user-profile-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ClickOutsideDirective, NgClass, ImgUserPictureDirective, NavLinksListComponent]
})
export class UserProfileMenuComponent implements OnInit {

   readonly showUserName = input<boolean | undefined>(false, { alias: "show-user-name" });
  readonly showPicture = input<boolean | undefined>(false, { alias: "show-picture" });
  protected userSub$: Subscription | null = null;
  protected statusSub$: Subscription | null = null;
  public user: User | null = null;
  public avatarName: string | null = null;
  public userMenuExpanded = false;
  private cdr = inject(ChangeDetectorRef);

  constructor(@Inject(AuthService) protected authService: AuthService,
              @Inject(Router) protected router: Router,
              @Inject(APP_LINKS) public links: any) { }

  ngOnInit(): void {
    this.authService.loadUser().subscribe((user) => {
      this.setCurrentUser(user);
      this.cdr.markForCheck();
    }, error => {
      console.error(error);
    });
    // Detect user changes and display / or not user info accordingly...
    this.userSub$ = this.authService.user$.subscribe((user: any) => {
      // console.log('ShellHeaderComponent user subscription');
      this.setCurrentUser(user);
      this.cdr.markForCheck();
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
    if (user && user.profile && user.profile.given_name && user.profile.family_name) {
      this.avatarName = `${user.profile.given_name.charAt(0)}${user.profile.family_name.charAt(0)}`.toUpperCase();
    }
  }

   public onClickOutside($event: any) {
    this.userMenuExpanded = false;
  }

}
