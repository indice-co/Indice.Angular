import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Contact } from './contact';
import { ContactResultSet } from '../combobox/contact';

@Component({
    selector: 'app-sample-enhanced-combobox',
    templateUrl: './sample-enhanced-combobox.component.html'
})
export class SampleEnhancedComboboxComponent {
    public selectedContact?: Contact;
    private _pageSize = 10;

    constructor(private _http: HttpClient) { }

    async fetchContacts(page: number, searchTerm?: string): Promise<Contact[]> {
        try {
            const resultSet = await lastValueFrom(
                this._http.get<ContactResultSet>('https://messaging.indice.gr/sample-contacts', {
                    params: {
                        page,
                        size: this._pageSize,
                        sort: 'fullName+',
                        search: searchTerm || ''
                    }
                })
            );
            return resultSet.items;
        } catch (error) {
            console.error('Error fetching contacts:', error);
            return [];
        }
    }

    onContactSelected(contact: Contact) {
        this.selectedContact = contact;
        console.log('Selected Contact:', contact);
    }
}
