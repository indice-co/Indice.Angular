import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[libStepInfo]',
    standalone: false
})
export class LibStepInfoDirective {
    constructor(public template: TemplateRef<any>) { }
}
