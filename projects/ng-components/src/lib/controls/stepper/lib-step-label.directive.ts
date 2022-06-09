import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[libStepLabel]',
})
export class LibStepLabelDirective {
    constructor(public template: TemplateRef<any>) { }
}
