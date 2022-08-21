import { IShellConfig, NavLink } from './../../../types';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { APP_LINKS } from '../../../tokens';
import { ActivatedRoute, Router } from '@angular/router';
import { share } from 'rxjs/operators';

@Component({
  selector: 'lib-shell-sidebar',
  templateUrl: './shell-sidebar.component.html'
})
export class ShellSidebarComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('section-links') sectionLinksPath = 'main';
  public sectionLinks: Observable<NavLink[]> = of([]);
  // tslint:disable-next-line:no-input-rename
  @Input('config') shellConfig: IShellConfig | undefined = undefined;
  @Input('sticky') sticky: boolean = false;
  public activeFragment: any | null = null;
  constructor(@Inject(Router) protected router: Router,
              @Inject(ActivatedRoute) protected route: ActivatedRoute,
              @Inject(APP_LINKS) public links: any) { }

  ngOnInit(): void {
    this.activeFragment = this.route.fragment.pipe(share());
    this.sectionLinks = this.links[this.sectionLinksPath] as Observable<NavLink[]>;
  }

}
