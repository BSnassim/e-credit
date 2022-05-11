import { SimulationComponent } from './credit/simulation/simulation.component';
import { FormCreditComponent } from './credit/form-credit/form-credit.component';
import { ListCreditComponent } from './credit/list-credit/list-credit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppMenuComponent,
    NotFoundComponent,
    AccueilComponent,
    LoginComponent,
    ListCreditComponent,
    FormCreditComponent,
    SimulationComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  // providers: [
  //   FingerprintAIO,
  // ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    FingerprintAIO,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
