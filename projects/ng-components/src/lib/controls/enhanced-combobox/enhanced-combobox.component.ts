import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-enhanced-combobox',
    templateUrl: './enhanced-combobox.component.html'
})
export class EnhancedComboboxComponent implements OnInit {
    private _debouncer: Subject<string> = new Subject<string>();
    private _items: any[] = [];

    private _selectedItemsFilter = (item: any, selectedItems: any[]) => {
        const selectedItem = selectedItems.find(this.equalityPredicate);
        return selectedItem == null || selectedItem == undefined;
    };

    constructor() { }

    @Input() public id: string = 'combobox';
    @Input() public placeholder: string | undefined;

    @Input('items') public set items(items: any[]) {
        this._items = items.filter(x => this._selectedItemsFilter(x, this.selectedItems));
    }

    public get items(): any[] {
        return this._items.filter(x => this._selectedItemsFilter(x, this.selectedItems));
    }

    @Input() public itemTemplate: TemplateRef<HTMLElement> | undefined = undefined;
    @Input() public equalityPredicate: (item: any, otherItem: any) => boolean | null = (x, y) => x === y;
    @Input() public selectedItemTemplate: TemplateRef<HTMLElement> | undefined = undefined;
    @Input() public noResultsTemplate: TemplateRef<unknown> | undefined = undefined;
    @Input() public busy: boolean = false;
    @Input() public multiple: boolean = true;
    @Input() public debounceMs: number = 1000;
    @Input() public displayShowMoreOption: boolean = false;
    @Output() public onSearch: EventEmitter<string | undefined> = new EventEmitter();
    @Output() public onItemSelected: EventEmitter<any> = new EventEmitter();
    @Output() public onShowMore: EventEmitter<any> = new EventEmitter();
    public showResults: boolean = false;
    public selectedItems: any[] = [];
    public value: string | undefined;
    protected searchTerm: string = '';

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
            const index = this.selectedItems.indexOf(item);
            if (index < 0) {
                this.selectedItems.push(item);
            }
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

    public emitShowMoreEvent(event: MouseEvent): void {
        event.stopPropagation();
        this.onShowMore.emit();
    }
}