import { OnInit, Directive, ElementRef, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { AUTH_SETTINGS } from '../tokens';
import { IAuthSettings } from '../types';

@Directive({
    selector: 'img[userPicture]',
    standalone: false
})
export class ImgUserPictureDirective implements OnInit {
    private _userId: string | undefined | null;
    private _size: number = 48;
    private _displayName: string = 'John Doe';
    private _color: string | undefined | null = undefined;
    private _img: HTMLImageElement;
    private _version: number = 0;
    private _initialized: boolean = false;

    constructor(@Inject(AUTH_SETTINGS) private authSettings: IAuthSettings, element: ElementRef) {
        this._img = element.nativeElement as HTMLImageElement;
    }
    ngOnInit(): void {
        this.setProfileSrc();
        this._initialized = true;
    }

    @Input('userPicture')
    public set setUserId(value: string) {
        if (this._userId === value) {
            return;
        }
        this._userId = value;
        if (this._initialized) {
            this.setProfileSrc();
        }
    }
    
    @Input('size')
    public set setSize(value: number) {
        this._size = value;
    }
    @Input('version')
    public set setVersion(value: number) {
        if (this._version === value) {
            return;
        }
        this._version = value;
        if (this._initialized) {
            this.setProfileSrc();
        }
    }

    @Input('displayName')
    public set setDisplayName(value: BaseUser | string) {
        if (!value) {
            return;
        }
        let text: string | undefined = this._displayName;
        if (typeof value === 'string') {
            text = value;
        } else {
            const firstName = value.firstName || '';
            const lastName = value.lastName || '';
            const givenName = value.given_name || '';
            const familyName = value.family_name || '';
            
            // Construct the display name based on available properties
            if (firstName || lastName) {
                text = `${firstName} ${lastName}`.trim();
            } else if (givenName || familyName) {
                text = `${givenName} ${familyName}`.trim();
            } else if (value.email) {
                text = value.email;
            } else if (value.userName) {
                text = value.userName;
            } else if (value.name) {
                text = value.name;
            }
        }
        if (!text) {
            return;
        }
        this._displayName = text.split('@')[0].replaceAll(/[\+\(\)\{\}\.,\[\]]/g, ' '); // removes any special characters
        if (this._initialized) {
            this.setProfileSrc();
        }
    }

    @Input('color')
    public set setColor(value: string | undefined | null) {
        this._color = value?.replace(/^#+/, '');
    }

    private setProfileSrc() {
        let fallbackParts = ['/avatar', this._displayName, this._size, this._color].filter(x => !!(x)).join('/');
        if (!this._userId) {
            let srcParts = ['/api/my/account/picture', this._size].join('/');
            this._img.src=`${this.authSettings.authority}${srcParts}?d=${encodeURIComponent(fallbackParts)}&v=${this._version}`;// create my link
            return;
        }
        (async () => {
            // create public link
            const hash = await this.generateSHA256Hash(this._userId!);
            let srcParts = ['/pictures', hash, this._size].join('/');
            this._img.src=`${this.authSettings.authority}${srcParts}?d=${encodeURIComponent(fallbackParts)}&v=${this._version}`;
        })();
        this._img.alt = `Profile picture ${this._displayName}`;
    }

    private async generateSHA256Hash(text: string) {
        // Encode the text as UTF-8
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
    
        // Compute the hash
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
        // Convert the hash to a hexadecimal string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    }
}

interface BaseUser {
    given_name?: string | undefined,
    family_name?: string | undefined,
    firstName?: string | undefined,
    lastName?: string | undefined,
    email?: string | undefined,
    name?: string | undefined,
    userName?: string | undefined
}