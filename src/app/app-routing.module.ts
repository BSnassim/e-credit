import { AuthGuardGuard } from './auth/guards/auth-guard.guard';
import { NotFoundComponent } from './main/not-found/not-found.component';
import { AppMainComponent } from './main/app-main/app-main.component';
import { mainRoutes } from './main/main-routing.module';
import { authRoutes } from './auth/auth-routing.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    
    children: [...mainRoutes],
  },
  ...authRoutes,
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
