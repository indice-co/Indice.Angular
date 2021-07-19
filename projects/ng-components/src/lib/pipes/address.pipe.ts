import { Pipe, PipeTransform } from '@angular/core';
import { IAddress } from '../types';

@Pipe({
    name: 'address',
    pure: false
})
export class AddressPipe implements PipeTransform {

    transform(value: IAddress | undefined): string {
        if (value === undefined || null || '') {
            return '';
        }
        // tslint:disable-next-line:no-non-null-assertion
        return `${value.street || ''}${value.streetNumber ? ' ' + value.streetNumber : ''}${value.city ? ', ' + value.city : ''}${+value.postalCode! ? ', ' + +value.postalCode! : ''}`;
    }
}
