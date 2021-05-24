import { Injectable } from '@angular/core';
import { ExternalNavLink, IAppLinks, NavLink } from '@indice/ng-components';

@Injectable()
export class AppLinks implements IAppLinks {
  public public: NavLink[] = [];
  public main: NavLink[] = [
    new NavLink('Αρχική', '/home', true),
  ];
  public profile: NavLink[] = [
    new NavLink('Προφίλ', '/profile', true),
    new NavLink('Ρυθμίσεις', '/settings', false),
    new NavLink('Αποσύνδεση', '/logout', false),
  ];
  public profileActions: NavLink[] = [];
  public legal: NavLink[] = [
    new ExternalNavLink('Ιδιωτικό Απόρρητο', 'https://my.inpolicy.eu/privacy'),
    new ExternalNavLink('Όροι χρήσης', 'https://my.inpolicy.eu/terms'),
    new ExternalNavLink('Επικοινωνία', 'https://my.inpolicy.gr/Epikoinwnia'),
  ];
  public brand: NavLink[] = [
    new ExternalNavLink('INDICE', 'https://www.indice.gr'),
    new ExternalNavLink('EVPulse', 'https://www.evpulse.eu'),
  ];
}

