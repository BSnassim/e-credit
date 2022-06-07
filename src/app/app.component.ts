import { Component, OnInit } from '@angular/core';
// import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.initializeApp();
  }
  async initializeApp() {
    await StatusBar.setStyle({ style: Style.Dark });
    await SplashScreen.hide();
    await SplashScreen.show({
      showDuration: 3000,
      autoHide: true,
    });
  }
}
