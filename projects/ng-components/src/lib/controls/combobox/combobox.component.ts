import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'lib-combobox',
    templateUrl: './combobox.component.html'
})
export class ComboboxComponent implements OnInit {
    private _debouncer: Subject<string> = new Subject<string>();
    private _items: any[] = [];

    private _defaultItemsFilter = (item: any) => {
        const selectedItem = this.selectedItems.find(x => x == item);
        return selectedItem == null || selectedItem == undefined;
    };

    constructor() { }

    @Input() public id: string = 'combobox';
    @Input() public placeholder: string | undefined;

    @Input('items') public set items(items: any[]) {
        if (!this.itemTemplate) {
            this._items = items.filter(this._defaultItemsFilter);
        } else {
            this._items = items.filter(this.selectedItemsFilter);
        }
    }

    public get items(): any[] {
        if (!this.itemTemplate) {
            return this._items.filter(this._defaultItemsFilter);
        } else {
            return this._items.filter(this.selectedItemsFilter);
        }
    }

    @Input() public itemTemplate: TemplateRef<HTMLElement> | undefined = undefined;
    @Input() public selectedItemsFilter: (item: any) => boolean | null = () => true;
    @Input() public selectedItemTemplate: TemplateRef<HTMLElement> | undefined = undefined;
    @Input() public noResultsTemplate: TemplateRef<HTMLElement> | undefined = undefined;
    @Input() public busy: boolean = false;
    @Input() public multiple: boolean = true;
    @Input() public debounceMs: number = 1000;
    @Output() public onSearch: EventEmitter<string | undefined> = new EventEmitter();
    @Output() public onItemSelected: EventEmitter<any> = new EventEmitter();
    public showResults: boolean = false;
    public selectedItems: any[] = [];
    public value: string | undefined;
    protected searchTerm: string = '';

    protected getSearchTermContext(): any  {
        return { $implicit: this.searchTerm };
    }

    public ngOnInit(): void {
        if (this.itemTemplate && !this.multiple) {
            this.multiple = true;
            console.warn('You cannot have a custom item template with single selection.');
        }
        this.emitSearchEvent();
        this._debouncer
            .pipe(
                debounceTime(this.debounceMs),
                distinctUntilChanged()
            )
            .subscribe((value: string) => {
                this.searchTerm = value;
                this.emitSearchEvent(value);
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
