import { AuthService } from '@indice/ng-auth';
import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, input } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router, RouterLink } from '@angular/router';
import { filter, share } from 'rxjs/operators';
import { NavLink } from '../../../types';
import { APP_LINKS, SHELL_CONFIG } from '../../../tokens';
import { Observable, Subscription, of } from 'rxjs';
import { User } from 'oidc-client-ts';
import { NavLinksListComponent } from '../../../controls/nav-links-list/nav-links-list.component';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { UserProfileMenuComponent } from '../../../controls/user-profile-menu/user-profile-menu.component';
import { NotificationsIndicatorComponent } from '../../../controls/notifications-indicator/notifications-indicator.component';
import { LanguageSelectionComponent } from '../../../controls/language-selection/language-selection.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'lib-shell-header',
    templateUrl: './shell-header.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, NavLinksListComponent, ClickOutsideDirective, UserProfileMenuComponent, NotificationsIndicatorComponent, LanguageSelectionComponent]
})
export class ShellHeaderComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  readonly sectionLinksPath = input('main', { alias: "section-links" });
  // tslint:disable-next-line:no-input-rename
  readonly profileMenuVisible = input(true, { alias: "profile-menu" });
  // tslint:disable-next-line:no-input-rename
  readonly showUserNameOnHeader = input<boolean | undefined>(false, { alias: "show-userName" });
  // tslint:disable-next-line:no-input-rename
  readonly showPictureOnHeader = input<boolean | undefined>(true, { alias: "show-picture" });
  // tslint:disable-next-line:no-input-rename
  readonly showAlerts = input<boolean | undefined>(false, { alias: "show-alerts" });
  // tslint:disable-next-line:no-input-rename
  readonly showLangs = input<boolean | undefined>(false, { alias: "show-langs" });
  readonly border = input(true);
  readonly busy = input<boolean>(false);
  public sectionLinks: Observable<NavLink[]> = of([]);
  public mobileMenuExpanded = false;
  public userMenuExpanded = false;
  protected routeSubject: Observable<Event>;
  protected routerSub$: Subscription | null = null;
  protected userSub$: Subscription | null = null;
  protected statusSub$: Subscription | null = null;
  public user: User | null = null;
  public avatarName: string | null = null;
  public activeFragment: any | null = null;

  constructor(
    @Inject(AuthService) protected authService: AuthService,
    @Inject(Router) protected router: Router,
    @Inject(ActivatedRoute) protected route: ActivatedRoute,
    @Inject(SHELL_CONFIG) public config: any,
    @Inject(APP_LINKS) public links: any) {
    this.routeSubject = this.router.events.pipe(filter((event) => event instanceof NavigationStart));
  }

  ngOnInit(): void {
    this.activeFragment = this.route.fragment.pipe(share());
    this.sectionLinks = this.links[this.sectionLinksPath()] as Observable<NavLink[]>;
    this.routerSub$ = this.routeSubject.subscribe((event) => {
      this.mobileMenuExpanded = false;
      this.userMenuExpanded = false;
    });
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

  ngOnDestroy(): void {

    if (this.routerSub$) {
      this.routerSub$.unsubscribe();
    }
    // TODO: check authenticated user here before we start polling server status
    if (this.statusSub$) {
      this.statusSub$.unsubscribe();
    }
    if (this.userSub$) {
      this.userSub$.unsubscribe();
    }
  }

  // tslint:disable-next-line:typedef
  public onClickOutside($event: any) {
    this.userMenuExpanded = false;
  }

  public signin(event: any | null | undefined): void {
    if (event) {
      event.preventDefault();
    }
    this.authService.signinRedirect();
  }

  private setCurrentUser(user: any): void {
    this.user = user;
    if (user && user.profile && user.profile.given_name && user.profile.given_name !== undefined && user.profile.family_name && user.profile.family_name !== undefined) {
      this.avatarName = `${user.profile.given_name.charAt(0)}${user.profile.family_name.charAt(0)}`.toUpperCase();
    }
  }

}

