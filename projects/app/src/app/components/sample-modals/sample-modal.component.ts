import { Component, Inject, TemplateRef } from '@angular/core';
import { Modal, ModalService, ModalOptions, MODAL_CONFIG_DEFAULT_OVERRIDE  } from '@indice/ng-components';

@Component({
  selector: 'lib-sample-modal',
  templateUrl: './sample-modal.component.html',
})
export class SampleModalComponent {
  public showActions = true;
  public secondModalRef: Modal | undefined;
  public title = 'old title';
  constructor(public modalRef: Modal, private modalService: ModalService, @Inject(ModalOptions) private options: ModalOptions) {
    console.log('SampleModalComponent', options);
    this.title = options?.initialState?.title as string ?? 'could not get title from initial state';
  }

  public openModal(template: TemplateRef<any>) {
    this.secondModalRef = this.modalService.show(template, {
      backdrop: 'static',
      initialState: { title: 'A title from my caller!' },
      keyboard: true
    });
    this.secondModalRef.onHidden?.subscribe((res) => {
      console.log(res);
      //Do smth after close
    });
  }
}
