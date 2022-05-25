import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { TokenService } from '../auth/services/token.service';
import { catchError } from 'rxjs/operators';
import { EventsService } from '../services/events.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private eventService: EventsService,
    private authService: AuthService
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401 || error.status === 403) {
          //  handling errors
          //  or token expired 
          //  refresh token
          if (token != null) {
            this.authService.logout();
          } else {
            this.tokenService.removeToken();
            this.router.navigate(['/login']);
          }
        }
        return throwError(error);
      })
    );
  }
}
