import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-avatar-initials',
  templateUrl: './avatar-initials.component.html'
})
export class AvatarInitialsComponent implements OnInit {
  @Input()
  public name: string | null | undefined;
  @Input()
  public large = false;
  public initials?: string;
  public circleColor!: string;
  private colors = [
    '#EB7181', // red
    '#468547', // green
    '#FFD558', // yellow
    '#3670B2', // blue
  ];

  constructor() { }

  ngOnInit(): void {
    this.createInititals();
    const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
    // assign this to a class if you want to randomly change background colors of the circle.
    this.circleColor = this.colors[randomIndex];
  }

  private createInititals(): void {
    if (this.name) {
      let initials = '';
      for (let i = 0; i < this.name.length; i++) {
        if (this.name.charAt(i) === ' ') {
          continue;
        }
        if (this.name.charAt(i) === this.name.charAt(i).toUpperCase()) {
          initials += this.name.charAt(i);
          if (initials.length === 2) {
            break;
          }
        }
      }
      this.initials = initials;
    }
  }
}
