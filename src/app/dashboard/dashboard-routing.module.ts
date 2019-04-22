import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

// const routes: Routes = [
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: '', component: DashboardComponent }
//     ]
//   },
//   {
//     path: 'student',
//     component: DashboardComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: 'view/:id', component: ViewStudentComponent },
//       { path: 'edit/:id', component: EditStudentComponent },
//       { path: 'add', component: AddStudentComponent }
//     ]
//   },
//   {path: '**', redirectTo: 'dashboard'}
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
