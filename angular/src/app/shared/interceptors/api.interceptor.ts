import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as constants from "../constants";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const updatedRequest = request.clone({
      url: request.url.replace("API", constants.API_URL)
    });

    // Pass the modified request to the next handler
    return next.handle(updatedRequest);
  }
}
