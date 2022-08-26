import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Icons, HeaderMetaItem } from '@indice/ng-components';
import { SampleAppShellConfig } from '../../app-shell-config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) { }

  public metaItems: HeaderMetaItem[] | null = [];
  public tiles: { text: string, count: number, path: string }[] = [];

  public ngOnInit(): void {
    this.metaItems = [
      { key: 'NG-LIB version :', icon: Icons.DateTime, text: new Date().toLocaleTimeString() },
      { key: 'NG-LIB version :', icon: Icons.DateTime, text: new Date().toLocaleTimeString() },
      { key: 'NG-LIB version :', icon: Icons.DateTime, text: new Date().toLocaleTimeString() },
      { key: 'NG-LIB version :', icon: Icons.DateTime, text: new Date().toLocaleTimeString() }
    ];
    this.tiles.push(
      { text: 'Shell', count: NaN, path: 'samples/shell-layout' },
      { text: 'View Layouts', count: 1, path: 'samples/view-layouts' },
      { text: 'Common pages', count: 4, path: '' },
      { text: 'Controls', count: 2, path: 'samples/controls' },
      { text: 'Modal playground', count: NaN, path: 'samples/modal-playground' },
      { text: 'Tab Groups', count: 1, path: 'samples/tab-group' },
      { text: 'Stepper', count: 1, path: 'samples/stepper' },
      { text: 'Sample inbox view', count: 1, path: 'samples/inbox' },
      { text: 'Combobox', count: 1, path: 'samples/combobox' },
      { text: 'Directives', count: 2, path: '' },
      { text: 'Pipes', count: 2, path: '' },
      { text: 'Services', count: 3, path: '' },
      { text: 'Advanced Search Playground', count: 1, path: 'samples/advanced-search-playground' }
    );
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(path);
  }

  public switchLayout(layout: any): void {
    SampleAppShellConfig.layout = layout;
  }
}
