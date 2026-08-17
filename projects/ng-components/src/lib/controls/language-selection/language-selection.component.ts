import { MenuOption } from './../../types';
import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { APP_LANGUAGES } from '../../tokens';
import { IAppLanguagesService } from '../../types';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'lib-language-selection',
    templateUrl: './language-selection.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ClickOutsideDirective, AsyncPipe]
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
