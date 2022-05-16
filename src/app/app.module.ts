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
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';
import { SuccessfullValidationComponent } from './auth/fingerprintVatidation/successfull-validation/successfull-validation.component';
import { Validation1Component } from './auth/fingerprintVatidation/validation1/validation1.component';
import { Validation2Component } from './auth/fingerprintVatidation/validation2/validation2.component';
import { Validation3Component } from './auth/fingerprintVatidation/validation3/validation3.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppMenuComponent,
    NotFoundComponent,
    AccueilComponent,
    LoginComponent,
    Validation1Component,
    Validation2Component,
    Validation3Component,
    SuccessfullValidationComponent,
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
  ],
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
