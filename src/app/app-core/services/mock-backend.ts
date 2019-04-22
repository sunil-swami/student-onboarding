﻿import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                if (!localStorage.getItem('users')) {
                const usersItem =   [
                    {
                        id: 1,
                        username: 'admin',
                        password: 'admin@123',
                        firstName: 'Sunil',
                        lastName: 'Swami',
                    }
                  ];

                localStorage.setItem('users', JSON.stringify(usersItem));
                }
                const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

                // find if any user matches login credentials
                const filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    const user = filteredUsers[0];
                    const body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'identity-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            if (request.url.endsWith('/student/initialize') && request.method === 'get') {


            }

            // pass through any requests not handled above
            return next.handle(request);

        }))
            // call materialize and dematerialize to ensure delay even if an error is thrown
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

