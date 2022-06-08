import { Icons } from './../../../ng-components/src/lib/icons';
import { Injectable } from '@angular/core';
import { ExternalNavLink, IAppLinks, NavLink } from 'projects/ng-components/src/lib/types';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppLinks implements IAppLinks {
  // tslint:disable-next-line:variable-name
  constructor() {

  }

  public public!: Observable<NavLink[]>;
  public profileActions!: Observable<NavLink[]>;
  public notifications: Observable<NavLink> = of(new NavLink('Προβολή όλων', 'samples/inbox', true));

  public main: Observable<NavLink[]> = of([
    new NavLink('Αρχική', 'dashboard', false, false, Icons.Dashboard),
    new NavLink('Shell samples', 'samples/shell-layout', false, false, Icons.Details),
    new NavLink('View layout samples', 'samples/view-layouts', false, false, Icons.Details),
    new ExternalNavLink('Ιδιωτικό Απόρρητο', 'https://www.indice.gr', true),
  ]);
  public profile: Observable<NavLink[]> = of([
    new NavLink('Προφίλ', '/profile', true),
    new NavLink('Ρυθμίσεις', '/settings', false),
    new NavLink('Αποσύνδεση', '/logout', false),
  ]);
  public legal: Observable<NavLink[]> = of([
    new ExternalNavLink('Ιδιωτικό Απόρρητο', '/privacy'),
    new ExternalNavLink('Όροι χρήσης', '/terms'),
    new ExternalNavLink('Επικοινωνία', '/Epikoinwnia'),
  ]);
  public brand: Observable<NavLink[]> = of([
    new ExternalNavLink('INDICE', 'https://www.indice.gr'),
  ]);
}
