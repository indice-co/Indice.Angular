import { formatDate } from "@angular/common";

export interface IDictionary<T> {
  [key: string]: T;
}

export namespace Operators {
  export const EQUALS = { label: '=', value: 'eq', description: 'Ίσο με' };
  export const NOT_EQUALS = { label: '≠', value: 'neq', description: 'Διάφορο του' };
  export const GREATER_THAN = { label: '>', value: 'gt', description: 'Μεγαλύτερο από' };
  export const LESS_THAN = { label: '<', value: 'lt', description: 'Μικρότερο από' };
  export const GREATER_THAN_EQUAL = { label: '≥', value: 'gte', description: 'Μεγαλύτερο ή ίσο με' };
  export const LESS_THAN_EQUAL = { label: '≤', value: 'lte', description: 'Μικρότερο ή ίσο με' };
  export const CONTAINS = { label: '∋', value: 'contains', description: 'Περιέχει' };
  export const IN = { label: '1..n', value: 'in', description: 'Μέσα σε' };
}

export enum QueryParameters {
  VIEW = 'view',
  PAGE_SIZE = 'pagesize',
  PAGE = 'page',
  SEARCH = 'search',
  SORT_FIELD = 'sort',
  SORT_DIRECTION = 'dir',
  FILTER = 'filter',
  FILTER_FROM = 'from',
  FILTER_TO = 'to'
}

export interface SearchOption {
  name: string;
  field: string;
  dataType: FilterClause.Dt;
  array?: boolean;
  multiTerm?: boolean;
  options?: SelectInputOption[];
  placeholder?: string;
}

export interface SelectInputOption {
  value: any;
  label: string;
  description?: string;
}

export namespace FilterClause {
  export type Op = 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains' | 'in';
  export type Dt = 'string' | 'integer' | 'number' | 'boolean' | 'datetime' | 'array' | 'daterange' | undefined;
}

export const OperatorOptions: IDictionary<{ label: string; value: string; description?: string }[]> = {
  'string': [Operators.EQUALS, Operators.NOT_EQUALS, Operators.CONTAINS],
  'array': [Operators.EQUALS, Operators.NOT_EQUALS]
};

export class FilterClause {
  // Member path to compare
  public member: string;
  // Value to compare against
  public value: any;
  // The operator to apply between the Indice.Types.FilterClause.Member and Indice.Types.FilterClause.Value
  public operator: FilterClause.Op;
  // The Indice.Types.JsonDataType of the data Indice.Types.FilterClause.Member
  public dataType: FilterClause.Dt;

  public uiName: string | undefined;
  public uiOperator: string | undefined;
  public uiValue: string | undefined;

  public constructor(member: string, value: any, operator?: FilterClause.Op, dataType?: FilterClause.Dt, searchOptions?: SearchOption[]) { // yeap, we do need searchOptions for the ui view model
    this.member = member;
    this.value = value;
    this.operator = operator || Operators.EQUALS.value as FilterClause.Op;
    this.dataType = dataType === undefined ? 'string' : dataType;
    // uiName
    if (this.dataType === 'datetime') { // special treatment for dates
      this.uiName = this.member === QueryParameters.FILTER_FROM ? 'Από' : 'Έως';
    } else {
      this.uiName = this.member;
      let fo = <any>{};
      if (searchOptions && searchOptions.length > 0) {
        fo = searchOptions.find((f) => {
          return f.field === this.member;
        });
      }

      if (fo) {
        this.uiName = fo.name;
      }
    }
    // uiOperator
    this.uiOperator = this.dataType === 'datetime' ? '' : Operators.EQUALS.label; // that's fine (for now)...
    // uiValue
    this.uiValue = this.value;
    if ((this.dataType === 'datetime')) {
      this.uiValue = formatDate(new Date(this.value), 'dd/MM/yyyy', 'en-US');
    }
    let fo: SearchOption | undefined;
    if (searchOptions && searchOptions.length > 0) {
      fo = searchOptions.find((f) => {
        return f.field === this.member;
      });
    }
    if (fo && fo.options) { // special treatment for arrays, if there is an options property then it is an array
      this.dataType = 'array';
      this.uiValue = fo!.options!.find((option) => {
        return option.value === this.value;
      })?.label;
    }
  }

  public static parse(text: string): FilterClause | undefined {
    const pattern = /^\s*([A-Za-z_][A-Za-z0-9_\.]+)::(eq|neq|gt|lt|gte|lte|contains|in)::(\((string|integer|number|boolean|datetime)\))?(.+)\s*$/gi;
    if (text != null) {
      const matches = pattern.exec(text);
      if (matches != null) {
        const path = matches[1];
        const op = <FilterClause.Op>matches[2];
        const dt = <FilterClause.Dt>matches[4];
        const v = matches[5];

        return new FilterClause(path, v, op, dt);
      }
    }
    return undefined;
  }

  public toString(): string {
    if (this.dataType !== 'string' && this.dataType !== 'array') {
      return `${this.member}::${this.operator}::(${this.dataType})${this.value}`;
    } else {
      return `${this.member}::${this.operator}::${this.value}`;
    }
  }

}
