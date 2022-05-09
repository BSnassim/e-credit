import { CreditModule } from './../credit/credit.module';
import { AccueilComponent } from './../accueil/accueil.component';
import { AppMainComponent } from './app-main/app-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const mainRoutes: Routes = [
  { path:'', component: AccueilComponent },
  {
    path:'credit', loadChildren: () => CreditModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
