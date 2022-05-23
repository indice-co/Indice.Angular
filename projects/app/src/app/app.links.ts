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
  public notifications: Observable<NavLink> = of(new NavLink('Προβολή όλων', '/inbox', true));

  public main: Observable<NavLink[]> = of([
    new NavLink('Αρχική', '/', true),
    new NavLink('@indice/ng-auth', '/ng-auth', true),
    new NavLink('@indice/ng-components', '/ng-components', true),
    new ExternalNavLink('Ιδιωτικό Απόρρητο', 'https://www.indice.gr'),
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
