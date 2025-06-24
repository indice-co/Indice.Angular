import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Contact } from './contact';
import { ContactResultSet } from '../combobox/contact';
import { ComboboxComponent } from '../../../../../ng-components/src/public-api';

@Component({
    selector: 'app-sample-enhanced-combobox',
    templateUrl: './sample-enhanced-combobox.component.html'
})
export class SampleEnhancedComboboxComponent implements OnInit {
    @ViewChild('advancedContactsCombobox', { static: true }) private _advancedContactsCombobox!: ComboboxComponent;

    constructor(
        private _changeDetector: ChangeDetectorRef,
        private _http: HttpClient
    ) { }

    public submitInProgress = false;
    public contacts: Contact[] = [];
    public contactNames: string[] = [];
    public contactsLoading: boolean = false;
    public displayShowMoreOption: boolean = false;

    private _page: number = 1;
    private _pageSize: number = 3;
    private _lastSearchTerm: string | undefined = undefined;

    public ngOnInit(): void { }

    public ngAfterViewInit(): void {
        this._changeDetector.detectChanges();
    }

    public contactsPredicate = (x: any, y: any) => x.id == y.id;

    public enhancedContactsFilter = (item: any) => {
        const selectedItem = this._advancedContactsCombobox.selectedItems.find((x: any) => this.contactsPredicate(x, item));
        return selectedItem == null || selectedItem == undefined;
    };

    public async onContactsSearch(searchTerm: string | undefined): Promise<void> {
        this._page = 1;
        this._lastSearchTerm = searchTerm;
        this.contactsLoading = true;

        try {
            const fetchedContacts = await this._fetchContacts(this._lastSearchTerm);
            this.contacts = fetchedContacts.items;
            this.displayShowMoreOption = fetchedContacts.items.length === this._pageSize;
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            this.contactsLoading = false;
        }
    }

    public async onShowMore(): Promise<void> {
        this._page++;
        this.contactsLoading = true;

        try {
            const fetchedContacts = await this._fetchContacts(this._lastSearchTerm);
            this.contacts = [...this.contacts, ...fetchedContacts.items];
            this.displayShowMoreOption = fetchedContacts.items.length === this._pageSize;
        } catch (error) {
            console.error('Error fetching more contacts:', error);
        } finally {
            this.contactsLoading = false;
        }
    }

    private _fetchContacts(searchTerm: string | undefined): Promise<ContactResultSet> {
        return lastValueFrom(
            //TODO revert to correct url
            //this._http.get<ContactResultSet>('https://messaging.indice.gr/sample-contacts', {
            this._http.get<ContactResultSet>('https://localhost:2001/api/distribution-lists/sample-contacts', {
                params: {
                    page: this._page,
                    size: this._pageSize,
                    sort: 'fullName+',
                    search: searchTerm || ''
                }
            })
        );
    }

    public onContactSelected(contact: Contact): void {
        console.log(contact);
    }

}
