import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { APP_LINKS } from '../../../tokens';
import { IAppLinks } from '../../../types';

@Component({
    selector: 'lib-shell-footer',
    templateUrl: './shell-footer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class ShellFooterComponent {
    constructor(@Inject(APP_LINKS) public links: IAppLinks) {
    }
}
