import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'lib-toggle',
  templateUrl: './toggle.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})
export class ToggleComponent implements OnInit, ControlValueAccessor {
  @Input()
  public value: boolean | null | undefined;
  @Input()
  public disabled:boolean | null | undefined;
  @Output() valueChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  private onChange$: any | undefined = undefined;
  private onTouched$: any | undefined = undefined;

  constructor() { }
  
  writeValue(obj: any): void {
    if(obj) {
      this.value = obj || false;
    }
  }
  registerOnChange(fn: any): void {
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
  }

  public changeValue(){
    this.value = !this.value;
    this.valueChange.emit(this.value);
    if(this.onChange$) {
      this.onChange$(this.value);
    }
    if(this.onTouched$) {
      this.onTouched$();
    }
  }
}