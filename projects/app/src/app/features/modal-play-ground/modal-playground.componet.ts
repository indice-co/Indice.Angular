import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, IResultSet, ListViewType, ModalService } from '@indice/ng-components';
import { Modal } from 'projects/ng-components/src/lib/services/modal-service/modal.class';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SampleModalWithResultComponent } from '../../components/sample-modals/sample-modal-with-result.component';
import { SampleModalComponent } from '../../components/sample-modals/sample-modal.component';
import { SampleViewModel } from '../../models/sample.vm';

export const ViewLayoutsListSamples = [
  new SampleViewModel(
    'From component',
    'Open a modal by passing a component to ModalService.show function and you are good to go!',
    undefined,
    ''
  ),

  new SampleViewModel('From templateRef', 'Or you can pass a template!', undefined, ''),

  new SampleViewModel(
    'From component with result',
    'You can subscribe to onHidden observable and get a result from modal component!',
    undefined,
    ''
  ),

  new SampleViewModel('From component with initial data', 'You can also pass initial data to modal component! Check the title! (animations are disabled for this one)', undefined, ''),
];
@Component({
  selector: 'app-modal-playground',
  templateUrl: './modal-playground.component.html',
})
export class ModalPlayGroundComponent extends BaseListComponent<SampleViewModel> implements OnInit {
  newItemLink: string | null = null;
  loadItems(): Observable<IResultSet<SampleViewModel> | null | undefined> {
    return of({ count: ViewLayoutsListSamples.length, items: ViewLayoutsListSamples }).pipe(delay(2000));
  }
  public templateModalRef: Modal | undefined;
  public result: any;
  public someData = 'something goes here';
  constructor(private modalService: ModalService, private activatedRoute: ActivatedRoute, private router: Router) {
    super(activatedRoute, router);
    this.view = ListViewType.Tiles;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public openModalFromComponent() {
    const modal = this.modalService.show(SampleModalComponent);
  }

  public openModalFromTemplate(template: TemplateRef<any>) {
    const modal = this.modalService.show(template);
    this.templateModalRef = modal;
  }

  public openModalWithResult() {
    const modal = this.modalService.show(SampleModalWithResultComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modal.onHidden?.subscribe((res) => {
      this.result = res;
    });
  }

  public openModalFromComponentWithInitialData() {
    const modal = this.modalService.show(SampleModalComponent, {
      animated: false,
      class: 'my-custom-modal-class',
      initialState: { title: 'A title from my caller!' },
      keyboard: true,
    });
  }
}
