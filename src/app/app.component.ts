import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Accueil', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Mes credits', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Demander un credit', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Logout', url: '/folder/Archived', icon: 'archive' },
  ];
  constructor() {}
}
