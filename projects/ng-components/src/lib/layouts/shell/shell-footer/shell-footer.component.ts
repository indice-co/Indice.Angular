import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { APP_LINKS } from '../../../tokens';
import { IAppLinks } from '../../../types';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'lib-shell-footer',
    templateUrl: './shell-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe]
})

export class ShellFooterComponent {
    constructor(@Inject(APP_LINKS) public links: IAppLinks) {
    }
}
