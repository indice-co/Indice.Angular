import { Component, Input, OnInit, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef, inject, input, output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'lib-enhanced-combobox',
    templateUrl: './enhanced-combobox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ClickOutsideDirective, FormsModule, NgTemplateOutlet]
})
export class EnhancedComboboxComponent implements OnInit {
    private _debouncer: Subject<string> = new Subject<string>();
    private _items: any[] = [];
    private cdr = inject(ChangeDetectorRef);

    constructor() { }

    public readonly id = input<string>('combobox');
    public readonly placeholder = input<string>();
    public readonly itemTemplate = input<TemplateRef<HTMLElement>>();
    public readonly selectedItemTemplate = input<TemplateRef<HTMLElement>>();
    @Input() public noResultsTemplate: TemplateRef<unknown> | undefined = undefined;
    public readonly busy = input<boolean>(false);
    public readonly multiple = input<boolean>(true);
    public readonly debounceMs = input<number>(1000);
    public readonly displayShowMoreOption = input<boolean>(false);
    public readonly equalityPredicate = input<(item: any, otherItem: any) => boolean>((x, y) => x === y);
    public readonly selectedItemsFilter = input<(item: any) => boolean>(() => true);

    @Input() public set items(items: any[]) {
        this._items = items;
    }
    public get items(): any[] {
        return this._items.filter(this.selectedItemsFilter());
    }

    public readonly onSearch = output<string | undefined>();
    public readonly onItemSelected = output<any>();
    public readonly onShowMore = output<any>();

    public showResults = false;
    public selectedItems: any[] = [];
    public value: string | undefined;
    protected searchTerm = '';

    public ngOnInit(): void {
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
        if (this.multiple()) {
            const index = this.selectedItems.findIndex(x => this.equalityPredicate()(x, item));
            if (index < 0) {
                this.selectedItems.push(item);
            }
        } else {
            this.value = item;
        }
    }

    public removeItem(item: any): void {
        const index = this.selectedItems.findIndex(x => this.equalityPredicate()(x, item));
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        }
    }

    private emitSearchEvent(searchTerm: string | undefined = undefined): void {
        this.onSearch.emit(searchTerm);
    }

    public emitShowMoreEvent(event: MouseEvent): void {
        event.stopPropagation();
        this.onShowMore.emit(undefined);
    }
}