import { Component, OnInit, TemplateRef } from '@angular/core';
import { Modal } from 'projects/ng-components/src/lib/services/modal-service/modal.class';

@Component({
  selector: 'lib-sample-modal-with-result',
  templateUrl: './sample-modal-with-result.component.html',
})
export class SampleModalWithResultComponent {
  public showActions = true;
  public secondModalRef: Modal | undefined;
  public title = 'A title';
  constructor(public modalRef: Modal) {
    console.log('SampleModalWithResultComponent', this.modalRef.content);
  }

  public answer(result: boolean): void {
    this.modalRef.hide(result);
  }
}
