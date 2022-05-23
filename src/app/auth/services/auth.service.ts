import { EventsService } from './../../services/events.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiURL;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private eventService: EventsService
  ) {}

  login(u: LoginUser): Observable<any> {
    return this.http.post(this.baseUrl + '/authenticate', u);
  }
  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
    this.eventService.loggedIn();
    window.location.reload();
  }
}
