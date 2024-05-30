import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SearchOption, FilterClause, Operators, OperatorOptions } from './models';
import { MenuOption } from '@indice/ng-components';

@Component({
  selector: 'lib-advanced-search',
  templateUrl: './advanced-search.component.html'
})
export class AdvancedSearchComponent implements OnInit, OnChanges {
  @Output() advancedSearchChanged: EventEmitter<FilterClause[]> = new EventEmitter<FilterClause[]>();
  @Input('operators-disabled') operatorsDisabled: boolean = false;
  @Input('search-options') searchOptions: SearchOption[] = [];
  @Input() filters: FilterClause[] = [];
  public menuOptions: MenuOption[] = [];
  public operatorMenuOptions: MenuOption[] = [];
  public operatorOptions = OperatorOptions;
  public operators: { [key: string]: MenuOption[] } = {};
  public selectedOperator?: string;
  public selectedField?: SearchOption;
  public fieldValue?: string;
  public fieldValueDateFrom: any;
  public fieldValueDateTo: any;
  public menuOptionsDictionary: { [key: string]: MenuOption[] } = {};

  constructor() { }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchOptions']) {
      this.setSearchOptions();
    }
  }

  public setSearchOptions() {
    const updatedSearchOptions = [];
    for (const searchOption of this.searchOptions) {
      updatedSearchOptions.push({
        text: searchOption.name,
        value: searchOption.field,
        data: searchOption.dataType,
        description: searchOption.placeholder,
        icon: undefined
      });
      if (searchOption.dataType === 'array' && searchOption.options) {
        this.menuOptionsDictionary[searchOption.field] = searchOption.options.map(option => ({
          text: option.label,
          value: option.value,
          data: undefined,
          description: option.description,
          icon: undefined
        }));
      }
    }
    this.menuOptions = updatedSearchOptions;
  }

  public selectedFieldChanged(field: string) {
    this.selectedField = this.searchOptions.find((searchOption) => searchOption.field === field);
    this.selectedOperator = undefined;
    // Since we have special UI handling for the daterange, we don't need to fill the operatorMenuOptions in that case.
    if (this.selectedField?.dataType != 'daterange') {
      let operatorMenuOpts: MenuOption[] = [];
      // based on the data type that we are filtering, fill the operator dropdown with the correct operators. The default is the string with equals/not-equals/contains
      this.operatorOptions[this.selectedField?.dataType ?? 'string'].forEach(x => {
        operatorMenuOpts.push({
          text: x.description ?? x.label,
          value: x.value,
          data: undefined,
          description: x.description,
          icon: undefined
        })
      })
      this.operatorMenuOptions = operatorMenuOpts;
      // Preselect the first option from the operators menu so there will always be a default value, which is the 'equals' operator for all data types for now.
      this.selectedOperator = this.operatorMenuOptions[0].value;
    }
    this.fieldValue = undefined;
  }

  public selectedOperatorChanged(operator: any) {
    this.selectedOperator = operator;
  }

  public selectedFieldValueChanged(fieldValue: string) {
    this.fieldValue = fieldValue;
  }

  public search() {
    if (!this.selectedField || !this.selectedField.dataType) {
      return;
    }
    // the filter is of type 'daterange'
    if (this.selectedField.dataType === 'daterange') {
      if (!this.selectedField.multiTerm) {
        this.filters = this.filters.filter((f) => {
          return f.dataType !== 'datetime';
        });
      }
      if (this.fieldValueDateFrom) {
        const filterClauseFrom = new FilterClause(this.selectedField.field, this.fieldValueDateFrom, Operators.GREATER_THAN_EQUAL.value as FilterClause.Op, 'datetime', this.searchOptions);
        this.filters.push(filterClauseFrom);
      }

      if (this.fieldValueDateTo) {
        const filterClauseTo = new FilterClause(this.selectedField.field, this.fieldValueDateTo, Operators.LESS_THAN_EQUAL.value as FilterClause.Op, 'datetime', this.searchOptions);
        this.filters.push(filterClauseTo);
      }
    }
    // the filter isn't of type 'daterange' (everything else)
    else {
      if (this.fieldValue === undefined) { // handle empty field value
        return;
      }
      // if no operator was provided, it falls back to the default 'equals' operator
      this.selectedOperator = this.selectedOperator ?? Operators.EQUALS.value;
      // create the filterClause
      const filterClause = new FilterClause(this.selectedField.field, this.fieldValue, this.selectedOperator as FilterClause.Op, this.selectedField.dataType, this.searchOptions);
      if (!this.selectedField.multiTerm) { // multiTerm means that we can have multiple filter values of the SAME filter clause (eg "filter case types that are Phone OR Address")
        this.filters = this.filters.filter((f) => {
          return f.member !== this.selectedField!.field;
        });
      } else { // selectedField is multiTerm: just checking if we already have the newly selected filterClause in filters
        const isDuplicate = this.filters.some(f => f.toString() === filterClause.toString());
        if (isDuplicate) {
          return;
        }
      }

      this.filters.push(filterClause);
      this.fieldValue = undefined;
    }
    this.advancedSearchChanged.emit(this.filters);
  }

  public removeFilter(index: number) {
    if (this.filters && this.filters.length >= index) {
      this.filters.splice(index, 1);
      this.advancedSearchChanged.emit(this.filters);
    }
  }

  public isDateValueUnpicked(): boolean {
    return this.fieldValueDateFrom === undefined && this.fieldValueDateTo === undefined;
  }

  public isFieldAndOperatorUnpicked(): boolean {
    // if the operators are enabled we need to check for both the field value and the operator value
    return this.operatorsDisabled ? this.fieldValue === undefined : (this.fieldValue === undefined || this.selectedOperator === undefined);
  }

  public clear() {
    this.fieldValueDateFrom = undefined;
    this.fieldValueDateTo = undefined;
    this.selectedField = undefined;
    this.fieldValue = undefined;
    this.selectedOperator = undefined;
    this.filters = [];
    this.advancedSearchChanged.emit(this.filters);
  }
}
