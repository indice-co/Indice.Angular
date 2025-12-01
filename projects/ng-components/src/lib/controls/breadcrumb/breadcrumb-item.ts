import { Observable } from "rxjs";

export class BreadcrumbItem {
    constructor(public title?: string | Observable<string>, public url?: string) {
        this.level = 0;
    }

    public level: number;

    public get urlSegments(): string[] | undefined {
        if (this.url) {
            return this.url?.split('/').filter(x => x !== '');
        }
        return undefined;
    }
}
