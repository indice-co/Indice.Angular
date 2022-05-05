import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { NavLink } from '../../types';

@Component({
  selector: 'lib-nav-links-list',
  templateUrl: './nav-links-list.component.html'
})
export class NavLinksListComponent implements OnInit {

  @Input() links: Observable<NavLink[]> | undefined;
  // tslint:disable-next-line:no-input-rename
  @Input('active-fragment') activeFragment: Observable<string> | undefined;
  // tslint:disable-next-line:no-input-rename
  @Input('link-class') navLinkClass: string | string = 'nav-link';
  // tslint:disable-next-line:no-input-rename
  @Input('link-active-class') navLinkActiveClass: string | string[] = 'nav-link-active';
  constructor() { }

  ngOnInit(): void {
  }

}
