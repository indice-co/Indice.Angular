import { IAppLanguagesService, MenuOption } from '../../../../ng-components/src/lib/types';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLanguagesService implements IAppLanguagesService {

  private langs$ = [
    new MenuOption('EL', 'EL', 'Ελληνικά'), new MenuOption('EN', 'EN', 'English')
  ];

  constructor() {
    this.options = of(this.langs$);
    this.selected = this.default = this.langs$[0].value;
  }
  public options: Observable<MenuOption[]> | undefined;
  public selected?: string | undefined;
  public default?: string | undefined;
  public setSelected(lang: string): void {
    this.selected = lang;
  }
}
