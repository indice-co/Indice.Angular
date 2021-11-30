import { AuthService } from '@indice/ng-auth';
import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { User } from 'oidc-client';
import { Event, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  @Input() border = true;
  public sectionLinks: NavLink[] = [];
  public mobileMenuExpanded = false;
  public userMenuExpanded = false;
  protected routeSubject: Observable<Event>;
  protected routerSub$: Subscription | null = null;
  protected userSub$: Subscription | null = null;
  protected statusSub$: Subscription | null = null;
  public user: User | null = null;
  public avatarName: string | null = null;

  constructor(
    @Inject(AuthService) protected authService: AuthService,
    @Inject(Router) protected router: Router,
    @Inject(SHELL_CONFIG) public config: any,
    @Inject(APP_LINKS) public links: any
  ) {
    this.routeSubject = this.router.events.pipe(filter((event) => event instanceof NavigationStart));
  }

  ngOnDestroy(): void {
    console.log(this.showUserNameOnHeader);

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

  ngOnInit(): void {
    this.sectionLinks = this.links[this.sectionLinksPath] as NavLink[];
    this.routerSub$ = this.routeSubject.subscribe((event) => {
      this.mobileMenuExpanded = false;
      this.userMenuExpanded = false;
    });
    this.authService.loadUser().subscribe((user) => {
      console.log(user);
      this.setCurrentUser(user);
    }, error => {
      console.error(error);
    }
    );
    // Detect user changes and display / or not user info accordingly...
    this.userSub$ = this.authService.user$.subscribe((user: any) => {
      // console.log('ShellHeaderComponent user subscription');
      this.setCurrentUser(user);
    });
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
      // console.log('load user', this.avatarName);
    }
  }
}
