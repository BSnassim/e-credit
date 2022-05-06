import { AccueilComponent } from './../accueil/accueil.component';
import { AppMainComponent } from './app-main/app-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {path:'', component: AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }