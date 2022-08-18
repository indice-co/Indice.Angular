import { AfterContentChecked, AfterContentInit, Component, ContentChildren, EventEmitter, forwardRef, OnInit, Output, QueryList } from '@angular/core';

import { LIBTABGROUP_ACCESSOR } from '../../tokens';
import { LibTabComponent } from './lib-tab.component';

@Component({
    selector: 'lib-tab-group',
    templateUrl: './lib-tab-group.component.html',
    providers: [
        { provide: LIBTABGROUP_ACCESSOR, useExisting: forwardRef(() => LibTabGroupComponent) }
    ]
})
export class LibTabGroupComponent implements OnInit, AfterContentInit, AfterContentChecked {
    private _tabs: LibTabComponent[] = [];

    constructor() { }

    /** The inner tabs of the group. */
    @ContentChildren(LibTabComponent, { descendants: true }) protected tabQueryList: QueryList<LibTabComponent> | undefined = undefined;
    /** Emmited when a step change occurs. */
    @Output() protected tabChanged: EventEmitter<LibTabComponent> = new EventEmitter<LibTabComponent>();

    /** The current tab. */
    public get currentTab(): LibTabComponent | undefined {
        return this.tabQueryList?.find(x => x.isActive);
    }

    /** The index (starting from zero) of the current tab. */
    public get currentΤabIndex(): number | undefined {
        return this.currentTab?.index || undefined;
    }

    protected get tabs(): LibTabComponent[] {
        return this._tabs;
    }

    protected set tabs(tabs: LibTabComponent[]) {
        this._tabs = tabs;
    }

    public ngOnInit(): void { }

    public removeTab(index: number): void {
        this.tabs = this.tabs.filter(x => x.index !== index);
    }

    protected onTabChanged(selectedTab: LibTabComponent): void {
        if (selectedTab.isActive) {
            return;
        }
        this.tabQueryList?.forEach((tab: LibTabComponent) => tab.isActive = tab.id === selectedTab.id);
        this.tabChanged.emit(selectedTab);
    }

    protected onTabSelectChanged(selectedTabIndex: number): void {
        if (selectedTabIndex === this.currentΤabIndex) {
            return;
        }
        this.tabQueryList?.forEach((tab: LibTabComponent, index: number) => tab.isActive = index === selectedTabIndex);
        this.tabChanged.emit(this.tabQueryList?.get(selectedTabIndex));
    }

    public ngAfterContentInit(): void {
        if (!this.tabQueryList) {
            return;
        }
        this._tabs = [...this.tabQueryList.toArray()];
    }

    public ngAfterContentChecked(): void {
        if (this.tabQueryList && this.tabQueryList.length > 0) {
            const anyActive = this.tabQueryList.filter(x => x.isActive).length > 0;
            if (!anyActive) {
                this.tabQueryList.get(0)!.isActive = true;
            }
        }
    }
}