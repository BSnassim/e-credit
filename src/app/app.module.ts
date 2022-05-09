import { FormCreditComponent } from './credit/form-credit/form-credit.component';
import { ListCreditComponent } from './credit/list-credit/list-credit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NotFoundComponent } from './main/not-found/not-found.component';
import { AppMenuComponent } from './main/app-menu/app-menu.component';
import { AppMainComponent } from './main/app-main/app-main.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppMenuComponent,
    NotFoundComponent,
    AccueilComponent,
    LoginComponent,
    ListCreditComponent,
    FormCreditComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
