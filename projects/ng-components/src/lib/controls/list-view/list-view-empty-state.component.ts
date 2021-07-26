import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-list-view-empty-state',
  templateUrl: './list-view-empty-state.component.html'
})
export class ListViewEmptyStateComponent implements OnInit {

  @Input() title = 'Δεν βρέθηκαν εγγραφές.';
  // tslint:disable-next-line:no-input-rename
  @Input('sub-title') subTitle = 'Αλλάξτε τα κριτήρια αναζήτησης σας ή ξεκινήστε προσθέτοντας μια νέα εγγραφή';
  // tslint:disable-next-line:no-input-rename
  @Input('new-item-label')  = 'Νέα εγγραφή';
  constructor() { }

  ngOnInit(): void {
  }

}
