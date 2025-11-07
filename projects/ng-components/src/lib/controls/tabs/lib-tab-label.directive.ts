import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[libTabLabel]',
    standalone: false
})
export class LibTabLabelDirective {
    constructor(public template: TemplateRef<any>) { }
}
