import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  login: BehaviorSubject<boolean> = new BehaviorSubject(false);

  baseUrl1 = environment.apiURL + '/gestionRdv';

  constructor(private http: HttpClient) {}

  loginReport() {
    this.login.next(true);
  }

  loggedIn() {
    this.login.next(false);
  }

  getRdvByIdUserAPI(id: string) {
    return this.http.get<any>(this.baseUrl1 + '/rdv/' + id);
  }
}
