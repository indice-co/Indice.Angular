import { ChangeDetectionStrategy, Component, ContentChild, Inject, Input, OnInit, Optional, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

import * as uuid from 'uuid';
import { LIBTABGROUP_ACCESSOR } from '../../tokens';
import { LibTabLabelDirective } from './lib-tab-label.directive';

@Component({
    selector: 'lib-tab',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibTabComponent implements OnInit {
    private _isActive: boolean = false;

    constructor(
        @Optional() @Inject(LIBTABGROUP_ACCESSOR) public readonly _tabGroup?: any
    ) { }

    /** The content provided for the tab. */
    @ViewChild(TemplateRef, { static: true }) public content: TemplateRef<any> | null = null;
    /** A label template for the tab header. */
    @ContentChild(LibTabLabelDirective) public label: LibTabLabelDirective | undefined;
    /** Indicates the unique id assigned in the tab. */
    @Input() public id: string | undefined;
    @Input() public labelText: string | undefined;

    /** Indicates the index of the tab. */
    public get index(): number {
        const index = this._tabGroup?.tabs.toArray()?.indexOf(this);
        return index;
    }

    /** Indicates whether the tab is active. */
    public get isActive(): boolean {
        return this._isActive;
    }

    /** Setter for LibTabComponent isActive property. */
    public set isActive(isActive: boolean) {
        this._isActive = isActive;
    }

    public ngOnInit(): void {
        this.id = this.id || uuid.v4();
    }
}