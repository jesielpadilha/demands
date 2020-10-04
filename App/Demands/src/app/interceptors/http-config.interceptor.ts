import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService, public errorDialogService: ErrorDialogService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authService.getAuthenticatedUser()?.token;

        if (token) {
            request = request.clone({ headers: request.headers.set("Authorization", "Bearer " + token) });
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    return event;
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason != '' ? error.error.reason : error.statusText,
                    status: error.status
                };
                this.errorDialogService.openDialog(data);
                return throwError(error);
            }));
    }
}