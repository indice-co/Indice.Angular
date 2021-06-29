import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

// freaksly simple date picker : https://tailwind-elements.com/docs/standard/forms/datepicker/
@Component({
  selector: 'lib-date-picker',
  templateUrl: './date-picker.component.html'
})
export class DatepickerComponent implements OnInit {
  @Input() readonly = false;
  // tslint:disable-next-line:no-input-rename
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

  public month = -1;
  public year = -1;
  public calendarDays: any[] = [];
  public blankDays: any[] = [];

  public compareDates(date1: Date | undefined | null, day: number): boolean {
    if(!date1) {
      return false;
    }
    const d = new Date(this.year, this.month, day);
    return date1.toDateString() === d.toDateString();
  };

  public selectDateValue(date: any): void {
    this.value = new Date(this.year, this.month, date.day);
    this.valueChange.emit(this.value);
    this.updateDays();
    this.showCalendar = false;
  }

  public previousMonth(): void {
    if (this.month !== 0) {
      this.month = this.month - 1;
      this.calcDays();
    }
  }

  public nextMonth(): void {
    if (this.month !== 11) {
      this.month = this.month + 1;
      this.calcDays();
    }
  }

  public calcDays(): void {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    const dayOfWeek = new Date(this.year, this.month).getDay();
    const blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    const daysArray = [];
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({day: i, today: this.compareDates(today, i), selected: this.compareDates(this.value, i)});
    }
    this.blankDays = blankdaysArray;
    this.calendarDays = daysArray;
  }

  private updateDays(): void {
    const today = new Date();
    this.calendarDays.forEach(d => {
      d.today = this.compareDates(today, d);
      d.selected = this.compareDates(this.value, d);;
    });
    console.log('udpate days', this.calendarDays);
  }

  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.calcDays();
  }

}
