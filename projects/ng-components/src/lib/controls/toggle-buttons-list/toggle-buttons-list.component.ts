import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuOption } from '../../types';


@Component({
  selector: 'lib-toggle-buttons-list',
  templateUrl: './toggle-buttons-list.component.html'
})
export class ToggleButtonsListComponent implements OnInit {
  @Input() icon: string | undefined = undefined;
  @Input() options: MenuOption[] | undefined;
  @Input() value: any | undefined;
  @Output() valueChange: EventEmitter<any> = new EventEmitter(undefined);
  constructor() { }

  ngOnInit(): void {
  }

  public selectOption(optionValue: any): void {
    this.value = optionValue;
    this.valueChange.emit(optionValue);
  }
}
