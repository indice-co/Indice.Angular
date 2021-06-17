import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-side-pane',
  templateUrl: './side-pane.component.html'
})
export class SidePaneComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('visible') showPane = false;
  public constainerStyle = 'side-pane-container-50';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void  {
    this.route.data.subscribe(data => {
        if (!data) {
          return;
        }
        if (data.paneSize === '25%') {
          this.constainerStyle = 'side-pane-container-25';
        } else if (data.paneSize === '50%') {
          this.constainerStyle = 'side-pane-container-50';
        } else if (data.paneSize === '75%') {
          this.constainerStyle = 'side-pane-container-75';
        } else {
          this.constainerStyle = 'side-pane-container-50';
        }
        console.log('SidePaneComponent', data, data.paneSize, this.constainerStyle);
    });
  }

  public onSidePaneActivated($event: any): void  {
    console.log('onSidePaneActivated', $event);
    this.showPane = true;
  }

  public onSidePaneDeactivated($event: any): void  {
    console.log('onSidePaneActivated', $event);
    this.showPane = false;
  }

}
