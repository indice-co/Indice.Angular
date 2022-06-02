import { ShellLayoutType } from './../../../../../ng-components/src/lib/types';
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
  public metaItems: HeaderMetaItem[] | null = [];
  public tiles: {text: string, count: number, path: string}[] = [];

  constructor(private router: Router){}

  ngOnInit(): void {
    this.metaItems = [
      { key: 'NG-LIB version :', icon: Icons.DateTime, text: new Date().toLocaleTimeString() },
      { key: 'NG-LIB version :', icon: Icons.DateTime, text: new Date().toLocaleTimeString() },
      { key: 'NG-LIB version :', icon: Icons.DateTime, text: new Date().toLocaleTimeString() },
      { key: 'NG-LIB version :', icon: Icons.DateTime, text: new Date().toLocaleTimeString() }
    ];

    this.tiles.push(
      {text: 'Shell', count: 2 , path: 'samples/shell-layout'},
      {text: 'View Layouts', count: 4 , path: 'samples/view-layouts'},
      {text: 'Common pages', count: 4 , path: ''},
      {text: 'Controls', count: 8, path: 'samples/controls'},
      {text: 'Modal playground', count: NaN , path: 'samples/modal-playground'},
      {text: 'Directives', count: 2, path: ''},
      {text: 'Pipes', count: 2 , path: ''},
      {text: 'Services', count: 3 , path: ''},
    );
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(path);
  }

  public switchLayout(layout: any): void {
    SampleAppShellConfig.layout = layout;
  }
}
