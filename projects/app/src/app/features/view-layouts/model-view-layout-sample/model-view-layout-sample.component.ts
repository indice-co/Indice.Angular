import { Component, OnInit } from '@angular/core';
import { HeaderMetaItem, Icons, RouterViewAction, ViewAction } from '@indice/ng-components';

@Component({
  selector: 'app-model-view-layout-sample',
  templateUrl: './model-view-layout-sample.component.html'
})
export class ModelViewLayoutSampleComponent implements OnInit {

  constructor() { }

  public navlinks = [
    { text: 'Tab 1 (Content)', link: 'tab1' }, 
    { text: 'Tab 2 (Form)', link: 'tab2' }
  ];

  public metaItems: HeaderMetaItem[] | null = [
    { key: 'Created :', icon: Icons.DateTime, text: new Date().toLocaleTimeString() },
    { key: 'Created by :', icon: Icons.Badges, text: 'some user' }
  ];;

  public auxlinks = [{ text: 'Aux Tab 1', link: 'aux-tab1' }];

  public actions:  ViewAction[] = [new RouterViewAction(Icons.Information, 'samples/shell-layout/info', 'rightpane', 'Πληροφορίες')]

  public icon = Icons.Details;

  ngOnInit(): void {
  }

}
