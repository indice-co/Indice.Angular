import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from '@indice/ng-components';
import { Modal } from 'projects/ng-components/src/lib/services/modal-service/modal.class';

@Component({
  selector: 'lib-sample-modal',
  templateUrl: './sample-modal.component.html',
})
export class SampleModalComponent {
  public showActions = true;
  public secondModalRef: Modal | undefined;
  public title = 'A title from modal component';
  constructor(public modalRef: Modal, private modalService: ModalService) {}

  public openModal(template: TemplateRef<any>) {
    this.secondModalRef = this.modalService.show(template, {
      backdrop: 'static',
      keyboard: false,
    });
    this.secondModalRef.onHidden?.subscribe((res) => {
      console.log(res);
      //Do smth after close
    });
  }
}
