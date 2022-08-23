import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[libTabLabel]'
})
export class LibTabLabelDirective {
    constructor(public template: TemplateRef<any>) { }
}
