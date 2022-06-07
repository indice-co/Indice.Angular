import { Component, OnInit } from '@angular/core';

import { LibTabComponent } from 'projects/ng-components/src/lib/controls/tabs/lib-tab.component';

@Component({
    selector: 'app-sample-tabs',
    templateUrl: './sample-tabs.component.html'
})
export class SampleTabsComponent implements OnInit {
    public ngOnInit(): void { }

    public onTabChanged(tab: LibTabComponent): void {
        console.log(tab);
    }
}
