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

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

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
          // 403 handled in auth.interceptor
          //  Token expired !
          //  refresh token
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
