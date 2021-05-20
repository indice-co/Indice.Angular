import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'ng-auth';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-logged-out',
  templateUrl: './logged-out.component.html'
})
export class LoggedOutComponent implements OnInit {
  status = 'working on it, please give me a sec...';
  finished = false;
  constructor(@Inject(AuthService) private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.completeSignout().then(() => {
      this.status = 'Thank you!';
      this.finished = true;
    });
  }

}
