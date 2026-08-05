import { Component, forwardRef, Input, OnInit, ChangeDetectionStrategy, input, output } from '@angular/core';
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
    ],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class ToggleButtonComponent implements OnInit {
  @Input() value: boolean = false;
  readonly disabled = input<boolean>(false);
  readonly icon = input<boolean>(true);
  @Input('text') text: string | null | undefined;
  readonly textTrue = input<string | null>(undefined, { alias: "text-true" });
  readonly textFalse = input<string | null>(undefined, { alias: "text-false" });
  @Input('description') description: string | null | undefined;
  readonly descriptionTrue = input<string | null>(undefined, { alias: "description-true" });
  readonly descriptionFalse = input<string | null>(undefined, { alias: "description-false" });
  readonly valueChange = output<boolean>();

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
