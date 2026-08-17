import { AfterContentChecked, AfterContentInit, Component, forwardRef, OnInit, ChangeDetectionStrategy, output, contentChildren } from '@angular/core';

import { LIBTABGROUP_ACCESSOR } from '../../tokens';
import { LibTabComponent } from './lib-tab.component';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'lib-tab-group',
    templateUrl: './lib-tab-group.component.html',
    providers: [
        { provide: LIBTABGROUP_ACCESSOR, useExisting: forwardRef(() => LibTabGroupComponent) }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, NgTemplateOutlet]
})
export class LibTabGroupComponent implements OnInit, AfterContentInit, AfterContentChecked {
    constructor() { }

    /** The inner tabs of the group. */
    public readonly tabs = contentChildren(LibTabComponent, { descendants: true });
    /** Emmited when a step change occurs. */
    protected readonly tabChanged = output<LibTabComponent>();

    /** The current tab. */
    public get currentTab(): LibTabComponent | undefined {
        return this.tabs()?.find(x => x.isActive);
    }

    /** The index (starting from zero) of the current tab. */
    public get currentΤabIndex(): number | undefined {
        return this.currentTab?.index || undefined;
    }

    public ngOnInit(): void { }

    protected onTabChanged(selectedTab: LibTabComponent): void {
        if (selectedTab.isActive) {
            return;
        }
        this.tabs()?.forEach((tab: LibTabComponent) => tab.isActive = tab.id === selectedTab.id);
        this.tabChanged.emit(selectedTab);
    }

    protected onTabSelectChanged(selectedTabIndex: number): void {
        if (selectedTabIndex === this.currentΤabIndex) {
            return;
        }
        const tabs = this.tabs();
        tabs?.forEach((tab: LibTabComponent, index: number) => tab.isActive = index === selectedTabIndex);
        const selectedTab = tabs?.at(selectedTabIndex);
        if (selectedTab) {
            this.tabChanged.emit(selectedTab);
        }
    }

    public ngAfterContentInit(): void {
        if (!this.tabs()) {
            return;
        }
    }

    public ngAfterContentChecked(): void {
        const tabs = this.tabs();
        if (tabs && tabs.length > 0) {
            const anyActive = tabs.filter(x => x.isActive).length > 0;
            if (!anyActive) {
                tabs.at(0)!.isActive = true;
            }
        }
    }
}