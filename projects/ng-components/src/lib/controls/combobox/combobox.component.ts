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

    @Input() public itemTemplate: TemplateRef<HTMLElement> | null = null;
    @Input() public selectedItemsFilter: (item: any) => boolean | null = () => true;
    @Input() public selectedItemTemplate: TemplateRef<HTMLElement> | null = null;
    @Input() public busy: boolean = false;
    @Input() public debounceMs: number = 1000;
    @Output() public onSearch: EventEmitter<string | undefined> = new EventEmitter();
    @Output() public onItemSelected: EventEmitter<any> = new EventEmitter();
    public showOptions: boolean = false;
    public selectedItems: any[] = [];

    public ngOnInit(): void {
        this.emitSearchEvent();
        this._debouncer
            .pipe(
                debounceTime(this.debounceMs),
                distinctUntilChanged()
            )
            .subscribe((value: string) => this.emitSearchEvent(value));
    }

    public onInputClick(): void {
        this.showOptions = true;
    }

    public onInputClickOutside(): void {
        this.showOptions = false;
    }

    public onInputKeyUp(event: any): void {
        this._debouncer.next(event.currentTarget.value);
    }

    public onListItemSelected(item: any): void {
        this.onItemSelected.emit(item);
        this.selectedItems.push(item);
    }

    public removeSelectedItem(item: any): void {
        const index = this.selectedItems.indexOf(item);
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        }
    }

    private emitSearchEvent(searchTerm: string | undefined = undefined): void {
        this.onSearch.emit(searchTerm);
    }
}
