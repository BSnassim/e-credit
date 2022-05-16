import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  baseUrl = environment.apiURL + '/authenticate';

  constructor(private http: HttpClient, private router: Router) {}
  getToken() {
    return sessionStorage.getItem('access token');
  }
  setToken(token: string) {
    sessionStorage.setItem('access token', token);
  }
  removeToken() {
    sessionStorage.removeItem('access token');
  }

  // Used to get the user details using his token
  getUser(): Observable<User> {
    return this.http.get<User>(
      this.baseUrl + '/getUserByToken/' + this.getToken()
    );
  }

  // Used to check if string matches encoded password
  checkPassword(rawPassword: string, encodedPassword: string) {
    return this.http.get(this.baseUrl + '/checkPassword', {
      params: {
        rawPassword,
        encodedPassword,
      },
    });
  }
}
