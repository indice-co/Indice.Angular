import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// freaksly simple date picker : https://tailwind-elements.com/docs/standard/forms/datepicker/
@Component({
  selector: 'lib-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),  // replace name as appropriate
      multi: true
    }
  ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  @Input() readonly: boolean = true;
  @Input() disabled: boolean = false;
  @Input('display-format') displayFormat: string | undefined = 'dd/MM/yyyy';
  @Input() placeholder: string | undefined = '';
  @Input() value: Date | undefined | null = null;
  @Output() valueChange: EventEmitter<Date> = new EventEmitter<Date>();
  @ViewChild('dateInput') dateInput: ElementRef | undefined;
  public showCalendar = false;
  public monthNames = [
    'Ιανουάριος',
    'Φεβρουάριος',
    'Μάρτιος',
    'Απρίλιος',
    'Μάϊος',
    'Ιούνιος',
    'Ιούλιος',
    'Αύγουστος',
    'Σεπτέμβριος',
    'Οκτώβριος',
    'Νοεμβριος',
    'Δεκέμβριος',
  ];
  public dayNames = ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'];

  public month: number = -1;
  public year: number = -1;
  public calendarDates: any[] = [];
  public blankDays: any[] = [];

  private onChange$: any | undefined = undefined;
  private onTouched$: any | undefined = undefined;

  public compareDates(date1: Date | undefined | null, day: number): boolean {
    if(!date1) {
      return false;
    }
    const d = new Date(this.year, this.month, day);
    return date1.toDateString() === d.toDateString();
  };

  public selectDateValue(date: any): void {
    let selectedDate = new Date(this.year, this.month, date.day);
    this.value = selectedDate;
    this.valueChange.emit(this.value);
    if(this.onChange$) {
      this.onChange$(this.value);
    }
    this.updateDays();
    if(this.onTouched$) {
      this.onTouched$();
    }
    this.showCalendar = false;
  }

  public previousMonth(): void {
    if (this.month !== 0) {
      this.month = this.month - 1;
      this.calcDays();
    } else {
      this.month = 11;
      this.year = this.year - 1;
      this.calcDays();
    }
    if(this.onTouched$) {
      this.onTouched$();
    }
  }

  public nextMonth(): void {
    if (this.month !== 11) {
      this.month = this.month + 1;
      this.calcDays();
    } else {
      this.month = 0;
      this.year = this.year + 1;
      this.calcDays();
    }
    if(this.onTouched$) {
      this.onTouched$();
    }
  }

  public calcDays(): void {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    const dayOfWeek = new Date(this.year, this.month).getDay();
    const blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    const daysArray = [];
    const today = new Date();
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push({day: i, today: this.compareDates(today, i), selected: this.compareDates(this.value, i)});
    }
    this.blankDays = blankdaysArray;
    this.calendarDates = daysArray;
  }

  private updateDays(): void {
    const today = new Date();
    this.calendarDates.forEach(d => {
      d.today = this.compareDates(today, d);
      d.selected = this.compareDates(this.value, d);;
    });
  }

  constructor() { }

  writeValue(obj: any): void {
    if(obj) {
      this.value = new Date(obj);
      this.month = this.value.getMonth();
      this.year = this.value.getFullYear();
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange$ = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched$ = fn;
  }

  public onBlur(event: any): void {
    if(this.onTouched$) {
      this.onTouched$();
    }
  }

  ngOnInit(): void {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.calcDays();
  }

}
