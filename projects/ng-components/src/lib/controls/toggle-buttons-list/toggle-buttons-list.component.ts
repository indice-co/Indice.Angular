import { Component, OnInit, Input, ChangeDetectionStrategy, input, output } from '@angular/core';
import { MenuOption } from '../../types';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';


@Component({
    selector: 'lib-toggle-buttons-list',
    templateUrl: './toggle-buttons-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DropDownMenuComponent]
})
export class ToggleButtonsListComponent implements OnInit {
  @Input() icon: string | undefined = undefined;
  readonly options = input<MenuOption[]>();
  @Input() value: any | undefined;
  readonly compact = input<boolean>(true);
  readonly dropDownMenuPlaceholder = input('Please select...'); // to set it from the outside
  readonly valueChange = output<any>();
  constructor() { }

  ngOnInit(): void {
  }

  public selectOption(optionValue: any): void {
    this.value = optionValue;
    this.valueChange.emit(optionValue);
  }
}
