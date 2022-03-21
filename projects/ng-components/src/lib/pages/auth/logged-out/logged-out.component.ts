import { AuthService } from '@indice/ng-auth';
import { Component, Inject, OnInit } from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-logged-out',
  templateUrl: './logged-out.component.html'
})
export class LoggedOutComponent implements OnInit {
  constructor(@Inject(AuthService) private authService: AuthService) { }

  public status = 'working on it, please give me a sec...';
  public finished = false;

  public ngOnInit(): void {
    this.authService.removeUser().subscribe(() => {
      this.status = 'Thank you!';
      this.finished = true;
    });
  }
}
