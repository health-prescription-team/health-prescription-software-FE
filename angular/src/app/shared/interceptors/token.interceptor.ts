import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token")

    if (token) {
      // Clone the request and add the JWT token to the Authorization header.
      request = request.clone({
        setHeaders: {
          Authorization: `token`,
        },
      });
    }
    return next.handle(request);
  }
}
