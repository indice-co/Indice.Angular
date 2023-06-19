import { Component, OnInit } from '@angular/core';
import { MenuOption } from '@indice/ng-components';

@Component({
  selector: 'app-toggle-buttons-list-sample',
  templateUrl: './toggle-buttons-list-sample.component.html',
  styleUrls: ['./toggle-buttons-list-sample.component.scss']
})
export class ToggleButtonsListSampleComponent implements OnInit {

  public filterOptions: MenuOption[] | undefined;
  public selectedFilter: string = "all";
  constructor() { }

  ngOnInit(): void {
    this.filterOptions = [];
    this.filterOptions.push(new MenuOption("translations[allKey]", 'all', '', {}, 'ms-Icon ms-Icon--ClearFilter'));
    this.filterOptions.push(new MenuOption("translations[activeKey]", 'active', '', {}, 'ms-Icon ms-Icon--PlugConnected'));
    this.filterOptions.push(new MenuOption("translations[inactiveKey]", 'inactive', '', {}, 'ms-Icon ms-Icon--PlugDisconnected'));
    this.filterOptions.push(new MenuOption("translations[inUseKey]", 'occupied', '', {}, 'ms-Icon ms-Icon--LightningBolt'));
    this.filterOptions.push(new MenuOption("translations[reservedKey]", 'reserved', '', {}, 'ms-Icon ms-Icon--ReminderTime'));
    this.filterOptions.push(new MenuOption("translations[withFailureKey]", 'faulted', '', {}, 'ms-Icon ms-Icon--ErrorBadge'));
  }

}
