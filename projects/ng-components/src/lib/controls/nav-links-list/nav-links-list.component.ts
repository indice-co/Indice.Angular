import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, input } from '@angular/core';
import { NavLink } from '../../types';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'lib-nav-links-list',
    templateUrl: './nav-links-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, RouterLinkActive, AsyncPipe]
})
export class NavLinksListComponent implements OnInit, OnDestroy {

  readonly links = input<Observable<NavLink[]>>();
  // tslint:disable-next-line:no-input-rename
  readonly activeFragment = input<Observable<string>>(undefined, { alias: "active-fragment" });
  // tslint:disable-next-line:no-input-rename
  readonly navLinkClass = input<string | string>('nav-link', { alias: "link-class" });
  // tslint:disable-next-line:no-input-rename
  readonly navLinkActiveClass = input<string | string[]>('nav-link-active', { alias: "link-active-class" });
  // tslint:disable-next-line:no-input-rename
  readonly containerClass = input<string | string[]>(undefined, { alias: "container-class" });
  // tslint:disable-next-line:no-input-rename
  readonly showIcons = input<boolean | undefined>(false, { alias: "show-icons" });
  readonly showText = input<boolean | undefined>(true, { alias: "show-text" });
  readonly largeIcons = input<boolean>(false, { alias: "large-icons" });
  public fragmentValue: string | undefined;
  private fragmentSub$: Subscription | undefined;
  constructor() { }
  
  ngOnDestroy(): void {
    this.fragmentSub$?.unsubscribe();
  }

  ngOnInit(): void {
      this.fragmentSub$ = this.activeFragment()?.subscribe( fragment => this.fragmentValue = fragment);
  }

}
