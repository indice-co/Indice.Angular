import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toast } from '../../types';

@Component({
  selector: 'lib-toaster',
  templateUrl: './toaster.component.html'
})
export class ToasterComponent implements OnInit {

  @Input() toast: Toast | undefined;
  @Input() i = 0;
  @Output() remove = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

}
