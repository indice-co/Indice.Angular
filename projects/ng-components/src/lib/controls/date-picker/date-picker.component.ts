import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// freaksly simple date picker : https://tailwind-elements.com/docs/standard/forms/datepicker/
@Component({
  selector: 'lib-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input('display-format') displayFormat: string | undefined = 'dd/MM/yyyy';
  @Input() placeholder: string | undefined = '';
  @Input() value: Date | undefined | null = null;
  @Output() valueChange: EventEmitter<Date> = new EventEmitter<Date>();
  @ViewChild('dateInput') dateInput: ElementRef | undefined;
  public showCalendar = false;
  public showYears = false;
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
  public calendarYears: any[] = [];
  public showCalendarYears: any[] = [];
  public blankDays: any[] = [];
  public calendarYearPage = 1;
  private yearsPerPage = 30;

  private onChange$: any | undefined = undefined;
  private onTouched$: any | undefined = undefined;

  ngOnInit(): void {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.calendarDates = [{ day: this.value, today: this.value, selected: this.value }];
    this.calendarYears = [{ year: this.value?.getFullYear(), today: this.value, selected: this.value }];
    const yearsArray = [];
    for (let i = 1950; i <= today.getFullYear() + 2; i++) {
      yearsArray.push({ year: i, today: this.compareDates(today, null, i), selected: i == this.value?.getFullYear() });
    }
    this.calendarYears = yearsArray;
    this.showCalendarYears = this.paginate(this.calendarYears, 1);
    this.calcDays();
  }

  constructor() { }

  writeValue(obj: any): void {
    if (obj) {
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
    if (this.onTouched$) {
      this.onTouched$();
    }
    this.getDateFromInput();
  }

  public selectDateValue(date: any): void {
    // This should be in UTC
    let selectedDate = new Date(this.year, this.month, date.day, 3, 0, 0, 0);
    this.value = selectedDate;
    this.valueChange.emit(this.value);
    if (this.onChange$) {
      this.onChange$(this.value);
    }
    this.updateDays();
    if (this.onTouched$) {
      this.onTouched$();
    }
    this.showCalendar = false;
  }

  public selectYearValue(year: any): void {
    // This should be in UTC
    let selectedDate = new Date(year.year, this.month ?? 1, this.calendarDates?.find(x => x.selected == true).day ?? 1, 3, 0, 0, 0);
    this.year = year.year;
    this.value = selectedDate;
    this.valueChange.emit(this.value);
    if (this.onChange$) {
      this.onChange$(this.value);
    }
    this.updateDays();
    if (this.onTouched$) {
      this.onTouched$();
    }
    this.showYears = false;
    this.showCalendar = true;
    this.calcDays();
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
    if (this.onTouched$) {
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
    if (this.onTouched$) {
      this.onTouched$();
    }
  }

  public previousYear(): void {
    this.showCalendarYears = this.paginate(
      this.calendarYears,
      this.calendarYearPage > 1 ? --this.calendarYearPage : 1);
    this.calcDays();
    if (this.onTouched$) {
      this.onTouched$();
    }
  }

  public nextYear(): void {
    this.showCalendarYears = this.paginate(
      this.calendarYears,
      this.calendarYearPage <= this.calendarYears.length / this.yearsPerPage
        ? ++this.calendarYearPage
        : this.calendarYearPage);
    this.calcDays();
    if (this.onTouched$) {
      this.onTouched$();
    }
  }

  private compareDates(date1: Date | undefined | null, day: number | null | undefined, year: number | null | undefined): boolean {
    if (!date1) {
      return false;
    }
    const d = new Date(year ?? this.year, this.month, day ?? this.value?.getDay());
    return date1.toDateString() === d.toDateString();
  };

  private calcDays(): void {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    // find where to start calendar day of week
    const dayOfWeek = new Date(this.year, this.month).getDay();
    const blankdaysArray = new Array<number>();
    for (var i = 1; i <= dayOfWeek; i++) {
      // check if month is February
      blankdaysArray.push(this.month != 2 ? (32 - i) : (29 - i));
      blankdaysArray.reverse().sort();
    }
    const daysArray = [];
    const today = new Date();
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push({ day: i, today: this.compareDates(today, i, null), selected: this.compareDates(this.value ?? today, i, null) });
    }
    const yearsArray = [];
    for (let i = 1950; i <= today.getFullYear() + 2; i++) {
      yearsArray.push({ year: i, today: this.compareDates(today, null, i), selected: i == this.year });
    }
    this.calendarYears = yearsArray;
    this.blankDays = blankdaysArray;
    this.calendarDates = daysArray;
  }

  private updateDays(): void {
    const today = new Date();
    this.calendarDates.forEach(d => {
      d.today = this.compareDates(today, d, this.year);
      d.selected = this.compareDates(this.value, d, this.year);
    });
  }

  private paginate(array: any[], page_number: number): any[] {
    return array.slice((page_number - 1) * this.yearsPerPage, page_number * this.yearsPerPage);
  }

  private getDateFromInput() {
    if (this.dateInput?.nativeElement.value !== '') {
      var dateParts = this.dateInput?.nativeElement.value.split("/");
      let dateInGrFormat = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], 3, 0, 0);
      if (dateInGrFormat.toString() !== 'Invalid Date') {
        this.writeValue(dateInGrFormat)
        this.calcDays();
        this.valueChange.emit(dateInGrFormat);
      }
      if (this.onChange$) {
        this.onChange$(this.value);
      }
      this.updateDays();
      if (this.onTouched$) {
        this.onTouched$();
      }
    }
    this.showCalendar = false;
  }

  public openYears() {
    this.showYears = !this.showYears;
    this.calendarYearPage = Math.ceil(this.calendarYears.map(x => x.year).indexOf(this.year) / this.yearsPerPage);
    this.showCalendarYears = this.paginate(this.calendarYears, this.calendarYearPage !== 0 ? this.calendarYearPage : 1);
    this.calcDays();
  }

  public openCalendar() {
    this.showCalendar = !this.showCalendar;
    this.calcDays();
  }
  
  public closeCalendar(){
    this.showCalendar = false;
    this.getDateFromInput();
  }

}