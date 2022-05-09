import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent implements OnInit {
  public appPages = [
    { title: 'Accueil', url: '/', icon: 'mail' },
    { title: 'Mes credits', url: '/credits', icon: 'paper-plane' },
    { title: 'Demander un credit', url: '/demande', icon: 'heart' },
    { title: 'Logout', url: '/login', icon: 'archive' },
  ];

  constructor(private menu: MenuController) {}

  ngOnInit() {}

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
