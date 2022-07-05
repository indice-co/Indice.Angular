import { ShellLayoutType } from './../../../types';
import { AuthService } from '@indice/ng-auth';
import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { User } from 'oidc-client';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';
import { filter, share } from 'rxjs/operators';
import { NavLink } from '../../../types';
import { APP_LINKS, SHELL_CONFIG } from '../../../tokens';
import { BehaviorSubject, isObservable, observable, Observable, of } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-shell-header',
  templateUrl: './shell-header.component.html',
})
export class ShellHeaderComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('section-links') sectionLinksPath = 'main';
  // tslint:disable-next-line:no-input-rename
  @Input('profile-menu') profileMenuVisible = true;
  // tslint:disable-next-line:no-input-rename
  @Input('show-userName') showUserNameOnHeader: boolean | undefined = false;
  // tslint:disable-next-line:no-input-rename
  @Input('show-alerts') showAlerts: boolean | undefined = false;
  // tslint:disable-next-line:no-input-rename
  @Input('show-langs') showLangs: boolean | undefined = false;
  @Input() border = true;
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
    this.sectionLinks = this.links[this.sectionLinksPath] as Observable<NavLink[]>;
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
    if (this.user && this.user.profile) {
      this.avatarName = `${this.user.profile.given_name?.charAt(0)}${this.user.profile.family_name?.charAt(0)}`.toUpperCase();
    }
  }

}

