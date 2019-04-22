import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './app-core/route-guard/auth/auth.guard';

const appRoutes: Routes = [
  {
      path: '',
      loadChildren: './dashboard/dashboard.module#DashboardModule',
      canActivate: [AuthGuard]
 },
  {
      path: 'notfound',
      loadChildren: './not-found/not-found.module#NotFoundModule',
      pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    pathMatch: 'full'
},
 {
      path: '**',
      redirectTo: 'notfound',
      pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
