import { ToastType } from './../../../../../../ng-components/src/lib/types';
import { ToasterService } from '@indice/ng-components';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'lib-toaster-sample',
  templateUrl: './toaster-sample.component.html',
  styleUrls: ['./toaster-sample.component.css']
})
export class ToasterSampleComponent implements OnInit {

  constructor(@Inject(ToasterService) private toaster: ToasterService) { }

  ngOnInit(): void {
  }

  showInfo(type: ToastType): void {
    this.toaster.show(type, 'title', 'my message!!!', 3000);
  }
}
