import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavLink } from '../../types';

@Component({
  selector: 'lib-nav-links-list',
  templateUrl: './nav-links-list.component.html'
})
export class NavLinksListComponent implements OnInit, OnDestroy {

  @Input() links: Observable<NavLink[]> | undefined;
  // tslint:disable-next-line:no-input-rename
  @Input('active-fragment') activeFragment: Observable<string> | undefined;
  // tslint:disable-next-line:no-input-rename
  @Input('link-class') navLinkClass: string | string = 'nav-link';
  // tslint:disable-next-line:no-input-rename
  @Input('link-active-class') navLinkActiveClass: string | string[] = 'nav-link-active';
  // tslint:disable-next-line:no-input-rename
  @Input('container-class') containerClass: string | string[] | undefined = undefined;
  // tslint:disable-next-line:no-input-rename
  @Input('show-icons') showIcons: boolean | undefined = false;
  public fragmentValue: string | undefined;
  private fragmentSub$: Subscription | undefined;
  constructor() { }
  
  ngOnDestroy(): void {
    this.fragmentSub$?.unsubscribe();
  }

  ngOnInit(): void {
      this.fragmentSub$ = this.activeFragment?.subscribe( fragment => this.fragmentValue = fragment);
  }

}
