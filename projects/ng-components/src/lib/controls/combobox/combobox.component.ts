import { Component, Input, OnInit, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef, inject, input, output } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'lib-combobox',
    templateUrl: './combobox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ClickOutsideDirective, FormsModule, NgTemplateOutlet]
})
export class ComboboxComponent implements OnInit {
    private _debouncer: Subject<string> = new Subject<string>();
    private _items: any[] = [];
    private cdr = inject(ChangeDetectorRef);

    private _defaultItemsFilter = (item: any) => {
        const selectedItem = this.selectedItems.find(x => x == item);
        return selectedItem == null || selectedItem == undefined;
    };

    constructor() { }

    public readonly id = input<string>('combobox');
    public readonly placeholder = input<string>();

    @Input() public set items(items: any[]) {
        if (!this.itemTemplate()) {
            this._items = items.filter(this._defaultItemsFilter);
        } else {
            this._items = items.filter(this.selectedItemsFilter());
        }
    }

    public get items(): any[] {
        if (!this.itemTemplate()) {
            return this._items.filter(this._defaultItemsFilter);
        } else {
            return this._items.filter(this.selectedItemsFilter());
        }
    }

    public readonly itemTemplate = input<TemplateRef<HTMLElement>>();
    public readonly selectedItemsFilter = input<(item: any) => boolean | null>(() => true);
    public readonly selectedItemTemplate = input<TemplateRef<HTMLElement>>();
    @Input() public noResultsTemplate: TemplateRef<unknown> | undefined = undefined;
    public readonly busy = input<boolean>(false);
    @Input() public multiple = true;
    public readonly debounceMs = input<number>(1000);
    public readonly onSearch = output<string | undefined>();
    public readonly onItemSelected = output<any>();
    public showResults = false;
    public selectedItems: any[] = [];
    public value: string | undefined;
    protected searchTerm = '';

    public ngOnInit(): void {
        if (this.itemTemplate() && !this.multiple) {
            this.multiple = true;
            console.warn('You cannot have a custom item template with single selection.');
        }
        this.emitSearchEvent();
        this._debouncer
            .pipe(
                debounceTime(this.debounceMs()),
                distinctUntilChanged()
            )
            .subscribe((value: string) => {
                this.searchTerm = value;
                this.emitSearchEvent(value);
                this.cdr.markForCheck();
            });
    }

    public onInputClick(): void {
        this.showResults = true;
    }

    public onClickOutside(): void {
        this.showResults = false;
    }

    public onInputKeyUp(event: any): void {
        this._debouncer.next(event.currentTarget.value);
    }

    public onListItemSelected(item: any): void {
        this.onItemSelected.emit(item);
        if (this.multiple) {
            this.selectedItems.push(item);
        } else {
            this.value = item;
        }
    }

    public removeItem(item: any): void {
        const index = this.selectedItems.indexOf(item);
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        }
    }

    private emitSearchEvent(searchTerm: string | undefined = undefined): void {
        this.onSearch.emit(searchTerm);
    }
}