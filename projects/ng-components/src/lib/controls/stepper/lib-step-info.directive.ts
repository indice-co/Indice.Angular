import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[libStepInfo]',
})
export class LibStepInfoDirective {
    constructor(public template: TemplateRef<any>) { }
}
