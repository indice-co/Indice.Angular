import { Component, OnInit } from '@angular/core';
import { Icons } from 'projects/ng-components/src/lib/icons';
import { MenuOption } from 'projects/ng-components/src/lib/types';

@Component({
  selector: 'app-drop-down-menu-sample',
  templateUrl: './drop-down-menu-sample.component.html',
  styleUrls: ['./drop-down-menu-sample.component.scss']
})
export class DropDownMenuSampleComponent implements OnInit {

  constructor() { }

  public options1: MenuOption[] = [ {text:'option 1', description: '', data: undefined, value:'option1', icon:Icons.Badges},
  {text:'option 2', value:'option2', description: '', data: undefined, icon:Icons.ChargePoints},
  {text:'option 3', value:'option3', description: '', data: undefined, icon:Icons.Collapse},
  {text:'option 4', value:'option4', description: '', data: undefined, icon:Icons.DateTime},
  {text:'option 5', value:'option5', description: '', data: undefined, icon:Icons.Delete}
  ];
  public option1: any | undefined;
  public options2 = [];
  public option2: any | undefined;

  ngOnInit(): void {
  }

}
