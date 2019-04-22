import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

const appRoutes: Routes = [
  {
      path: '',
      component: LoginComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(appRoutes),
      CommonModule
  ],
  declarations: [
  ],
  exports: [
      RouterModule
  ],
  providers: [
  ],
})
export class LoginRoutingModule { }
