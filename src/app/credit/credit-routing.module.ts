import { SimulationComponent } from './simulation/simulation.component';
import { FormCreditComponent } from './form-credit/form-credit.component';
import { ListCreditComponent } from './list-credit/list-credit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  { path: 'mescredits', component: ListCreditComponent },
  { path: 'demande', component: FormCreditComponent },
  { path: 'simulation', component: SimulationComponent },
  { path: 'notification', component: NotificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditRoutingModule {}
