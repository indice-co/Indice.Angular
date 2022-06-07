import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Contact, ContactResultSet } from './contact';

@Component({
    selector: 'app-sample-combobox',
    templateUrl: './sample-combobox.component.html'
})
export class SampleComboboxComponent implements OnInit {
    constructor(
        private _changeDetector: ChangeDetectorRef,
        private _http: HttpClient
    ) { }

    public submitInProgress = false;
    public contacts: Contact[] = [];
    public contactNames: string[] = [];
    public advancedContactsLoading: boolean = false;
    public contactsLoading: boolean = false;

    public ngOnInit(): void { }

    public onAdvancedContactsSearch(searchTerm: string | undefined): void {
        this.advancedContactsLoading = true;
        this._http
            .get<ContactResultSet>('https://indice-notifications.azurewebsites.net/api/sample-contacts', {
                params: {
                    page: 1,
                    size: 100,
                    sort: 'fullName+',
                    search: searchTerm || ''
                }
            })
            .subscribe((contacts: ContactResultSet) => {
                this.contacts = contacts.items;
                this.advancedContactsLoading = false;
            });
    }

    public onAdvancedContactSelected(contact: Contact): void {
        console.log(contact);
    }

    public onContactsSearch(searchTerm: string | undefined): void {
        this.contactsLoading = true;
        this._http
            .get<ContactResultSet>('https://indice-notifications.azurewebsites.net/api/sample-contacts', {
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
