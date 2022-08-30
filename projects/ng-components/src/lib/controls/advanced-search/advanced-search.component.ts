import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuOption } from '../../types';
import { SearchOption, FilterClause, QueryParameters, Operators } from './models';

@Component({
  selector: 'lib-advanced-search',
  templateUrl: './advanced-search.component.html'
})
export class AdvancedSearchComponent implements OnInit {
  @Output() advancedSearchChanged: EventEmitter<FilterClause[]> = new EventEmitter<FilterClause[]>();
  @Input('search-options') searchOptions: SearchOption[] = [];
  @Input() filters: FilterClause[] = [];
  public menuOptions: MenuOption[] = [];
  public selectedField?: SearchOption;
  public fieldValue?: string;
  public fieldValueDateFrom: any;
  public fieldValueDateTo: any;
  public menuOptionsDictionary: { [key: string]: MenuOption[] } = {};

  constructor() { }

  public ngOnInit(): void {
    this.searchOptions.forEach((searchOption) => {
      this.menuOptions.push({
        text: searchOption.name,
        value: searchOption.field,
        data: searchOption.dataType,
        description: searchOption.placeholder,
        icon: undefined
      });
      if (searchOption.dataType === 'array') {
        let menuOpts: MenuOption[] = [];
        searchOption.options?.forEach((selectInputOption) => {
          menuOpts.push({
            text: selectInputOption.label,
            value: selectInputOption.value,
            data: undefined,
            description: selectInputOption.description,
            icon: undefined
          });
        })
        this.menuOptionsDictionary[searchOption.field] = menuOpts;
      }
    });
  }

  public selectedFieldChanged(field: string) {
    this.selectedField = this.searchOptions.find((searchOption) => searchOption.field === field);
    this.fieldValue = undefined;
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
          return f.member !== QueryParameters.FILTER_FROM && f.member !== QueryParameters.FILTER_TO;
        });
      }
      if (this.fieldValueDateFrom) {
        const filterClauseFrom = new FilterClause(QueryParameters.FILTER_FROM, this.fieldValueDateFrom, Operators.GREATER_THAN_EQUAL.value as FilterClause.Op, 'datetime', this.searchOptions);
        this.filters.push(filterClauseFrom);
      }

      if (this.fieldValueDateTo) {
        const filterClauseTo = new FilterClause(QueryParameters.FILTER_TO, this.fieldValueDateTo, Operators.LESS_THAN_EQUAL.value as FilterClause.Op, 'datetime', this.searchOptions);
        this.filters.push(filterClauseTo);
      }
    }
    // the filter isn't of type 'daterange' (everything else)
    else {
      if (this.fieldValue === undefined) { // handle empty field value
        return;
      }
      // create the filterClause
      const filterClause = new FilterClause(this.selectedField.field, this.fieldValue, Operators.EQUALS.value as FilterClause.Op, this.selectedField.dataType, this.searchOptions); // operator is always 'equals'...

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

  public clear() {
    this.fieldValueDateFrom = undefined;
    this.fieldValueDateTo = undefined;
    this.selectedField = undefined;
    this.fieldValue = undefined;
    this.filters = [];
    this.advancedSearchChanged.emit(this.filters);
  }

}
