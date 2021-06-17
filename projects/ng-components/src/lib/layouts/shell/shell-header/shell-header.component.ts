import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { User } from 'oidc-client';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IAppLinks, NavLink } from '../../../types';
import { AuthService } from '@indice/ng-auth';
import { APP_LINKS } from '../../../tokens';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-shell-header',
  templateUrl: './shell-header.component.html'
})
export class ShellHeaderComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('section-links') sectionLinksPath = 'main';
  // tslint:disable-next-line:no-input-rename
  @Input('profile-menu') profileMenuVisible = true;
  @Input() border = true;
  public sectionLinks: NavLink[] = [];
  public mobileMenuExpanded = false;
  public userMenuExpanded = false;
  private routerSub$: any;
  private userSub$: any;
  public user: User | null = null;
  public avatarName: string | null = null;
  private statusSub$: any;

  constructor(@Inject(AuthService) private authService: AuthService,
              @Inject(Router) private router: Router,
              @Inject(APP_LINKS) public links: any) {
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

  ngOnInit(): void {
    this.sectionLinks = this.links[this.sectionLinksPath] as NavLink[];
    this.routerSub$ = this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(event => {
      this.mobileMenuExpanded = false;
      this.userMenuExpanded = false;
    });
    this.authService.loadUser().then(user => {
      this.setCurrentUser(user);
    }, error => {
        console.log(error);
    });
    // Detect user changes and display / or not user info accordingly...
    this.userSub$ = this.authService.userStatus.subscribe((user: any) => {
      this.setCurrentUser(user);
    });
  }

  // tslint:disable-next-line:typedef
  private setCurrentUser(user: any) {
    this.user = user;
    if (this.user && this.user.profile) {
      this.avatarName = `${this.user.profile.given_name?.charAt(0)}${this.user.profile.family_name?.charAt(0)}`;
      console.log('load user', this.avatarName);
    }
  }

  // tslint:disable-next-line:typedef
  public onClickOutside($event: any) {
    this.userMenuExpanded = false;
  }

  public signin(): void {
    this.authService.startAuthentication();
  }
}

