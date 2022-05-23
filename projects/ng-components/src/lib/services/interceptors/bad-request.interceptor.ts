import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToasterService } from '../toaster.service';
import { UtilitiesService } from '../utilities.service';
import { ToastType } from '../../types';


@Injectable()
export class BadRequestInterceptor implements HttpInterceptor {
    constructor(
        @Inject(ToasterService) private toaster: ToasterService,
        private utilities: UtilitiesService
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpResponse<any>) => {
                if (error instanceof HttpErrorResponse && error.status === 400) {
                    const fileReader = new FileReader();
                    fileReader.addEventListener('loadend', () => {
                        // tslint:disable-next-line:no-non-null-assertion
                        const problemDetails = fileReader.result!;
                        this.toaster.show(ToastType.Error, 'Αποτυχία αιτήματος', `${this.utilities.getValidationProblemDetails(JSON.parse(problemDetails.toString()))}`, 6000);
                    });
                    fileReader.readAsText(error.error);
                }
                throw error;
            })
        );
    }
}
