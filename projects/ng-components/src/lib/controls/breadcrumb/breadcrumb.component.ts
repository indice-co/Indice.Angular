import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { BreadcrumbService } from '../../services/breadcrumb.service';
import { BreadcrumbItem } from './breadcrumb-item';
import { isObservable } from 'rxjs';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'lib-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet, RouterLink, AsyncPipe]
})
export class BreadcrumbComponent implements OnInit {
    constructor(
        private _breadcrumbService: BreadcrumbService,
        private _cdr: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        this._breadcrumbService
            .breadcrumb
            .subscribe((breadcrumb: BreadcrumbItem[]) => {
                this.breadcrumb = [...breadcrumb, new BreadcrumbItem('', '')];
                this._cdr.markForCheck();
            });
  }
  isAsync(value: any): boolean {
    return isObservable(value);
  } 

    public breadcrumb: BreadcrumbItem[] = [];
}
