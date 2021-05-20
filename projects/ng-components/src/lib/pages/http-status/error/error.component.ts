import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
  public error = 'Error!';

  ngOnInit(): void {
  }

}
