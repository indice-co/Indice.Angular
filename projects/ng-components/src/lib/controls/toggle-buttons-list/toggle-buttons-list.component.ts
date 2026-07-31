import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MenuOption } from '../../types';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';


@Component({
    selector: 'lib-toggle-buttons-list',
    templateUrl: './toggle-buttons-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [DropDownMenuComponent]
})
export class ToggleButtonsListComponent implements OnInit {
  @Input() icon: string | undefined = undefined;
  @Input() options: MenuOption[] | undefined;
  @Input() value: any | undefined;
  @Input() compact: boolean = true;
  @Input() dropDownMenuPlaceholder = 'Please select...'; // to set it from the outside
  @Output() valueChange: EventEmitter<any> = new EventEmitter(undefined);
  constructor() { }

  ngOnInit(): void {
  }

  public selectOption(optionValue: any): void {
    this.value = optionValue;
    this.valueChange.emit(optionValue);
  }
}
