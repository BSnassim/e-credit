import { Component, OnInit } from '@angular/core';
import { DemandeRdv } from 'src/app/models/demande-rdv';
// import { TokenService } from 'src/app/auth/services/token.service';
// import { AppMainComponent } from 'src/app/main/app-main/app-main.component';

import { EventsService } from 'src/app/Services/events.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  date: Date;

  events: DemandeRdv[] = [];

  constructor(
    // public appMain: AppMainComponent,
    // private tokenService: TokenService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.getEvent(2);
  }
  // doRefresh(event) {
  //   setTimeout(() => {
  //     this.getUser().then((res) => {
  //       this.getEvent(res.id);
  //     });
  //     event.target.complete();
  //   }, 2000);
  // }
  // async getUser() {
  //   const res = await this.tokenService.getUser().toPromise();
  //   return res;
  // }
  getEvent(id: number) {
    this.eventsService.getRdvByIdUserAPI(id).subscribe((data) => {
      console.log(data);
      this.events = data;
    });
  }
}
