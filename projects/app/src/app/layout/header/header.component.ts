import { Component, OnInit } from '@angular/core';
import { IHeaderComponent } from '@indice/ng-components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, IHeaderComponent  {
  constructor(){}

  ngOnInit() {
  }

}
