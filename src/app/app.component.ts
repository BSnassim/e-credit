import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showSplash = true;

  constructor() {}

  ngOnInit() {
    this.initializeApp();
  }
  initializeApp() {
    // Platform.ready().then(() => {
    StatusBar.setStyle({ style: Style.Dark });
    SplashScreen.hide();
    timer(3000).subscribe(() => (this.showSplash = false));
    // SplashScreen.show({
    //   showDuration: 3000,
    //   autoHide: true,
    // });
    // });
  }
}
