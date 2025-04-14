import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-enhanced-combobox',
    templateUrl: './enhanced-combobox.component.html'
})
export class EnhancedComboboxComponent<T> {
    @Input() pageSize: number = 5;
    @Input() labelKey: keyof T | undefined; // Property to display in UI
    @Input() fetchData!: (page: number, searchTerm?: string) => Promise<T[]>; // Parent fetches data

    @Output() itemSelected = new EventEmitter<T>();

    public items: T[] = [];
    public isLoading = false;
    private _page = 1;
    private _searchTerm: string | undefined;

    async onSearch(searchTerm?: string) {
        this._searchTerm = searchTerm;
        this._page = 1;
        this.items = await this.loadData(true);
    }

    async onShowMore() {
        this._page++;
        const newItems = await this.loadData(false);
        this.items = [...this.items, ...newItems];
    }

    async loadData(reset: boolean): Promise<T[]> {
        this.isLoading = true;
        try {
            return await this.fetchData(this._page, this._searchTerm);
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        } finally {
            this.isLoading = false;
        }
    }

    selectItem(item: T) {
        this.itemSelected.emit(item);
    }
}
