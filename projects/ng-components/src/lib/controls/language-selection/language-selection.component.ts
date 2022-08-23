import { MenuOption } from './../../types';
import { Component, Inject, OnInit } from '@angular/core';
import { APP_LANGUAGES } from '../../tokens';
import { IAppLanguagesService } from '../../types';

@Component({
  selector: 'lib-language-selection',
  templateUrl: './language-selection.component.html'
})
export class LanguageSelectionComponent implements OnInit {

  public menuExpanded = false;
  constructor(@Inject(APP_LANGUAGES) public langsService: IAppLanguagesService | undefined) { }

  ngOnInit(): void {
  }

  public selectLang(option: MenuOption): void {
    if (this.langsService?.setSelected) {
      this.langsService.setSelected(option.value);
    }
  }

  public onClickOutside($event: any): void {
    this.menuExpanded = false;
  }
}
