import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'lib-avatar-initials',
    templateUrl: './avatar-initials.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass]
})
export class AvatarInitialsComponent implements OnInit {
  public readonly name = input<string | null>();
  public readonly large = input(false);
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
    const name = this.name();
    if (name) {
      let initials = '';
      for (let i = 0; i < name.length; i++) {
        if (name.charAt(i) === ' ') {
          continue;
        }
        if (name.charAt(i) === name.charAt(i).toUpperCase()) {
          initials += name.charAt(i);
          if (initials.length === 2) {
            break;
          }
        }
      }
      this.initials = initials;
    }
  }
}
