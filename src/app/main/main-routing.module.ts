import { CreditModule } from './../credit/credit.module';
import { AccueilComponent } from './../accueil/accueil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const mainRoutes: Routes = [
  { path:'accueil', component: AccueilComponent },
  { path: '', redirectTo:'/accueil',pathMatch:'full'},
  {
    path:'credit', loadChildren: () => CreditModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
