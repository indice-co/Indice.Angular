import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, input, inject, ChangeDetectorRef } from '@angular/core';
import { NavLink } from '../../types';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'lib-nav-links-list',
    templateUrl: './nav-links-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, RouterLinkActive, AsyncPipe]
})
export class NavLinksListComponent implements OnInit, OnDestroy {

  readonly links = input<Observable<NavLink[]>>();
   readonly activeFragment = input<Observable<string>>(undefined, { alias: "active-fragment" });
   readonly navLinkClass = input<string | string>('nav-link', { alias: "link-class" });
   readonly navLinkActiveClass = input<string | string[]>('nav-link-active', { alias: "link-active-class" });
   readonly containerClass = input<string | string[]>(undefined, { alias: "container-class" });
   readonly showIcons = input<boolean | undefined>(false, { alias: "show-icons" });
  readonly showText = input<boolean | undefined>(true, { alias: "show-text" });
  readonly largeIcons = input<boolean>(false, { alias: "large-icons" });
  public fragmentValue: string | undefined;
  private fragmentSub$: Subscription | undefined;
  private cdr = inject(ChangeDetectorRef);
  constructor() { }
  
  ngOnDestroy(): void {
    this.fragmentSub$?.unsubscribe();
  }

  ngOnInit(): void {
      this.fragmentSub$ = this.activeFragment()?.subscribe( fragment => {
        this.fragmentValue = fragment;
        this.cdr.markForCheck();
      });
  }

}
