import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  {
      path: '',
      component: NotFoundComponent,
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
export class NotFoundRoutingModule { }
