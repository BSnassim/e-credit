import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  login: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  loginReport(){
    this.login.next(true);
  }

  loggedIn(){
    this.login.next(false);
  }
}
