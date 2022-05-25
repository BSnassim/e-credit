import { Component, OnInit } from '@angular/core';
import { DemandeRdv } from 'src/app/models/demande-rdv';

import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  date: Date;

  events: DemandeRdv[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.getEvent(2);
  }
  getEvent(id: number) {
    this.eventsService.getRdvByIdUserAPI(id).subscribe((data) => {
      this.events = data;
    });
  }
}
