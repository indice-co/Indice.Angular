import { IShellConfig, NavLink } from './../../../types';
import { Component, Inject, OnInit, ChangeDetectionStrategy, input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { APP_LINKS } from '../../../tokens';
import { ActivatedRoute, Router } from '@angular/router';
import { share } from 'rxjs/operators';
import { NavLinksListComponent } from '../../../controls/nav-links-list/nav-links-list.component';

@Component({
    selector: 'lib-shell-sidebar',
    templateUrl: './shell-sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavLinksListComponent]
})
export class ShellSidebarComponent implements OnInit {
  constructor(
    @Inject(Router) protected router: Router,
    @Inject(ActivatedRoute) protected route: ActivatedRoute,
    @Inject(APP_LINKS) public links: any
  ) { }

  readonly sectionLinksPath = input('main', { alias: "section-links" });
  readonly shellConfig = input<IShellConfig>(undefined, { alias: "config" });
  readonly sticky = input<boolean>(false);
  public sectionLinks: Observable<NavLink[]> = of([]);
  public activeFragment: any | null = null;

  public get activeNavLinkClass(): string {
    const linkClasses = 'sidebar ' + (this.sticky() ? 'nav-link-active-b' : 'nav-link-active-l') + ' group';
    console.log('activeNavLinkClass getter ', linkClasses);
    return linkClasses;
  }

  public ngOnInit(): void {
    this.activeFragment = this.route.fragment.pipe(share());
    this.sectionLinks = this.links[this.sectionLinksPath()] as Observable<NavLink[]>;
  }
}
