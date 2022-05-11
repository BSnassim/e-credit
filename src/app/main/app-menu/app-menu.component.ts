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
<<<<<<< HEAD
  public appPages = [
    { title: 'Accueil', url: '/', icon: 'mail' },
    { title: 'Mes credits', url: '/credits', icon: 'paper-plane' },
    { title: 'Demander un credit', url: '/demande', icon: 'heart' },
    { title: 'Logout', url: '/login', icon: 'archive' },
  ];

  constructor(private menu: MenuController) {}
=======

  user ={} as User;

  public appPages = [
    { title: 'Accueil', url: '/accueil', icon: 'home' },
    { title: 'Notifications', url: '/notfound', icon: 'notifications' },
    { title: 'Mes credits', url: '/credit/mescredits', icon: 'bar-chart' },
    { title: 'Demander un credit', url: '/credit/simulation', icon: 'create' },
  ];

  constructor(private menu: MenuController, private authService:AuthService, private tokenService:TokenService) { }
>>>>>>> origin/master

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.tokenService.getUser().subscribe( data =>{
      this.user = data;
    })
  }

  logout(){
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
