import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { BreadcrumbService } from '../../services/breadcrumb.service';
import { BreadcrumbItem } from './breadcrumb-item';
import { isObservable } from 'rxjs';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'lib-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgTemplateOutlet, RouterLink, AsyncPipe]
})
export class BreadcrumbComponent implements OnInit {
    constructor(
        private _breadcrumbService: BreadcrumbService
    ) { }

    public ngOnInit(): void {
        this._breadcrumbService
            .breadcrumb
            .subscribe((breadcrumb: BreadcrumbItem[]) => {
                this.breadcrumb = [...breadcrumb, new BreadcrumbItem('', '')];
            });
  }
  isAsync(value: any): boolean {
    return isObservable(value);
  } 

    public breadcrumb: BreadcrumbItem[] = [];
}
