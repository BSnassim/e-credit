import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessfullValidationComponent } from './fingerprintVatidation/successfull-validation/successfull-validation.component';
import { Validation3Component } from './fingerprintVatidation/validation3/validation3.component';
import { Validation2Component } from './fingerprintVatidation/validation2/validation2.component';
import { Validation1Component } from './fingerprintVatidation/validation1/validation1.component';

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'validation1', component: Validation1Component },
  { path: 'validation2', component: Validation2Component },
  { path: 'validation3', component: Validation3Component },
  { path: 'successfullValidation', component: SuccessfullValidationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
