import { FormCreditComponent } from './form-credit/form-credit.component';
import { ListCreditComponent } from './list-credit/list-credit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'mescredits', component: ListCreditComponent},
  { path: 'demande', component: FormCreditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditRoutingModule { }
