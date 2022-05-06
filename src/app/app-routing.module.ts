import { NotFoundComponent } from './main/not-found/not-found.component';
import { AppMainComponent } from './main/app-main/app-main.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { mainRoutes } from './main/main-routing.module'
import { authRoutes } from './auth/auth-routing.module';

const routes: Routes = [
  { path: '', component: AppMainComponent, children:[...mainRoutes] },
  ...authRoutes,
  { path: 'notfound', component: NotFoundComponent},
  { path: '**', redirectTo: '/notfound'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
