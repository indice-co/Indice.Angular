import { Injectable } from '@angular/core';
import { ExternalNavLink, IAppLinks, NavLink } from '@indice/ng-components';

@Injectable()
export class AppLinks implements IAppLinks {
  // tslint:disable-next-line:variable-name
  constructor() {
    
  }
  public: NavLink[] = [];
  profileActions: NavLink[] = [];

  public main: NavLink[] = [
    new NavLink('Αρχική', '/', true),
  ];
  public profile: NavLink[] = [
    new NavLink('Προφίλ', '/profile', true),
    new NavLink('Ρυθμίσεις', '/settings', false),
    new NavLink('Αποσύνδεση', '/logout', false),
  ];
  public legal: NavLink[] = [
    new ExternalNavLink('Ιδιωτικό Απόρρητο', '/privacy'),
    new ExternalNavLink('Όροι χρήσης', '/terms'),
    new ExternalNavLink('Επικοινωνία', '/Epikoinwnia'),
  ];
  public brand: NavLink[] = [
    new ExternalNavLink('INDICE', 'https://www.indice.gr'),
  ];
}
