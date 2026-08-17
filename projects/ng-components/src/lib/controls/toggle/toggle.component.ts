import { Component, forwardRef, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, input, output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
    selector: 'lib-toggle',
    templateUrl: './toggle.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass]
})
export class ToggleComponent implements OnInit, ControlValueAccessor {
  @Input()
  public value: boolean | null | undefined;
  public readonly disabled = input<boolean | null>();
  readonly privateLabel = input<string>('Private');
  readonly publicLabel = input<string>('The file should be private'); 
  readonly valueChange = output<Boolean>();

  private onChange$: any | undefined = undefined;
  private onTouched$: any | undefined = undefined;
  private cdr = inject(ChangeDetectorRef);

  constructor() { }

  writeValue(obj: any): void {
    if(obj) {
      this.value = obj || false;
    }
    this.cdr.markForCheck();
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
