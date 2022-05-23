import { EventsService } from './../../services/events.service';
import { User } from './../../models/user';
import { TokenService } from './../../auth/services/token.service';
import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent implements OnInit {
  user = {} as User;

  public appPages = [
    { title: 'Accueil', url: '/accueil', icon: 'home' },
    {
      title: 'Notifications',
      url: '/credit/notification',
      icon: 'notifications',
    },
    { title: 'Mes credits', url: '/credit/mescredits', icon: 'bar-chart' },
    { title: 'Demander un credit', url: '/credit/demande', icon: 'create' },
  ];

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private tokenService: TokenService,
    private events: EventsService
  ) {}

  ngOnInit() {
    this.getUser();
    this.events.login.subscribe((data) => {
      if (data === true) {
        this.getUser();
      }
    });
  }

  getUser() {
    this.tokenService.getUser().subscribe((data) => {
      this.user = data;
    });
  }

  logout() {
    this.authService.logout();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
