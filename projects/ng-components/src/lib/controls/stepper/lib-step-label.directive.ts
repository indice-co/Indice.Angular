import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[libStepLabel]',
    standalone: false
})
export class LibStepLabelDirective {
    constructor(public template: TemplateRef<any>) { }
}
