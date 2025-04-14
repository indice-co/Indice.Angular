import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { ComboboxComponent } from 'projects/ng-components/src/public-api';
import { Contact, ContactResultSet } from './contact';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-sample-combobox',
    templateUrl: './sample-combobox.component.html'
})
export class SampleComboboxComponent implements OnInit {
    @ViewChild('advancedContactsCombobox', { static: true }) private _advancedContactsCombobox!: ComboboxComponent;

    constructor(
        private _changeDetector: ChangeDetectorRef,
        private _http: HttpClient
    ) { }

    public submitInProgress = false;
    public contacts: Contact[] = [];
    public contactNames: string[] = [];
    public advancedContactsLoading: boolean = false;
    public contactsLoading: boolean = false;
    public displayShowMoreOption: boolean = false;

    private _page: number = 1;
    private _pageSize: number = 3;
    private _lastSearchTerm: string | undefined = undefined;

    public ngOnInit(): void { }

    public advancedContactsPredicate = (x: any, y: any) => x.id == y.id;

    public async onAdvancedContactsSearch(searchTerm: string | undefined): Promise<void> {
        this._page = 1;
        this._lastSearchTerm = searchTerm;
        this.advancedContactsLoading = true;

        try {
            const fetchedContacts = await this._fetchContacts(this._lastSearchTerm);
            this.contacts = fetchedContacts.items;
            this.displayShowMoreOption = fetchedContacts.items.length === this._pageSize;
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            this.advancedContactsLoading = false;
        }
    }

    public async onShowMore(): Promise<void> {
        this._page++;
        this.advancedContactsLoading = true;

        try {
            const fetchedContacts = await this._fetchContacts(this._lastSearchTerm);
            this.contacts = [...this.contacts, ...fetchedContacts.items];
            this.displayShowMoreOption = fetchedContacts.items.length === this._pageSize;
        } catch (error) {
            console.error('Error fetching more contacts:', error);
        } finally {
            this.advancedContactsLoading = false;
        }
    }

    private _fetchContacts(searchTerm: string | undefined): Promise<ContactResultSet> {
        return lastValueFrom(
            this._http.get<ContactResultSet>('https://messaging.indice.gr/sample-contacts', {
                params: {
                    page: this._page,
                    size: this._pageSize,
                    sort: 'fullName+',
                    search: searchTerm || ''
                }
            })
        );
    }


    public onAdvancedContactSelected(contact: Contact): void {
        console.log(contact);
    }

    public onContactsSearch(searchTerm: string | undefined): void {
        this.contactsLoading = true;
        this._http
            .get<ContactResultSet>('https://messaging.indice.gr/sample-contacts', {
                params: {
                    page: 1,
                    size: 100,
                    sort: 'fullName+',
                    search: searchTerm || ''
                }
            })
            .subscribe((contacts: ContactResultSet) => {
                this.contactNames = contacts.items.map(x => x.fullName!);
                this.contactsLoading = false;
            });
    }

    public onContactSelected(contact: string): void {
        console.log(contact);
    }

    public ngAfterViewInit(): void {
        this._changeDetector.detectChanges();
    }
}
