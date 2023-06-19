import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-toggle-button',
  templateUrl: './toggle-button.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true
    }
  ]
})
export class ToggleButtonComponent implements OnInit {
  @Input() value: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: boolean = true;
  @Input('text') text: string | null | undefined;
  @Input('text-true') textTrue: string | null | undefined;
  @Input('text-false') textFalse: string | null | undefined;
  @Input('description') description: string | null | undefined;
  @Input('description-true') descriptionTrue: string | null | undefined;
  @Input('description-false') descriptionFalse: string | null | undefined;
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private onChange$: any | undefined = undefined;
  private onTouched$: any | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
  }

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
