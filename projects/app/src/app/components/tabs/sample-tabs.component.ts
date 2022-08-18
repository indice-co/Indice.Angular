import { Component, OnInit, ViewChild } from '@angular/core';

import { LibTabGroupComponent } from 'projects/ng-components/src/lib/controls/tabs/lib-tab-group.component';
import { LibTabComponent } from 'projects/ng-components/src/lib/controls/tabs/lib-tab.component';



@Component({
    selector: 'app-sample-tabs',
    templateUrl: './sample-tabs.component.html'
})
export class SampleTabsComponent implements OnInit {
    @ViewChild('tabGroup', { static: true }) private _tabGroup: LibTabGroupComponent | undefined;

    public ngOnInit(): void { }

    public onTabChanged(tab: LibTabComponent): void {
        console.log('tab change', tab);
    }

    public onTabDelete(tab: LibTabComponent): void {
        console.log('tab delete', tab);
        this._tabGroup?.removeTab(tab.index);
    }
}
