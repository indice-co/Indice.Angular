import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lib-error',
    templateUrl: './error.component.html',
    standalone: false
})
export class ErrorComponent implements OnInit {
  public error = 'Error!';

  ngOnInit(): void {
  }

}
