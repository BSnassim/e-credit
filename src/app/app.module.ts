import { LoginComponent } from './auth/login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NotFoundComponent } from './main/not-found/not-found.component';
import { AppMenuComponent } from './main/app-menu/app-menu.component';
import { AppMainComponent } from './main/app-main/app-main.component';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppMenuComponent,
    NotFoundComponent,
    AccueilComponent,
    LoginComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FingerprintAIO,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
