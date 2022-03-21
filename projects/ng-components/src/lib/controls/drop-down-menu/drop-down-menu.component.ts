import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MenuOption } from '../../types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
})
export class DropDownMenuComponent implements OnInit, OnChanges {
  @Input() options: MenuOption[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('selected') selectedValue: any | null = null;
  @Input() multiple = false;
  @Input() placeholder: string = 'Παρακαλώ επιλέξτε...';

  private selectedOption$: MenuOption | null = null;
  public get selectedOption(): MenuOption | null {
    return this.selectedOption$;
  }
  public set selectedOption(option: MenuOption | null) {
    this.selectedOption$ = option;
    this.selectedValue = option ? option.value : null;
    this.expanded = false;
  }

  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter<any>();

  private expanded$ = false;
  public get expanded(): boolean {
    return this.expanded$;
  }
  public set expanded(value: boolean) {
    this.expanded$ = value;
  }
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options && this.options.length > 0 && this.selectedValue !== null && this.selectedValue !== undefined) {
      this.selectedOption$ = this.options.filter((o) => o.value === this.selectedValue)[0];
    }
  }

  ngOnInit(): void {}

  public isSelected(option: MenuOption): boolean {
    return option != null && this.selectedValue != null && option.value === this.selectedValue;
  }

  public onClickOutside($event: any): void {
    this.expanded = false;
  }

  public selectOption(option: MenuOption): void {
    this.selectedOption = option;
    this.selectedChange.emit(option.value);
    this.selectedChanged.emit(option.value);
  }
}
