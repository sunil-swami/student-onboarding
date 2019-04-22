import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {MatToolbarModule, MatSidenavModule, MatIconModule, MatTabsModule ,
  MatListModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatDatepickerModule,
  MatSnackBarModule, MatSelectModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { HeaderComponent } from 'src/app/app-shared/component/header/header.component';
import { LoadersCssModule } from 'angular2-loaders-css';
import { ViewStudentComponent } from './view-student/view-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { DataShareService } from '../app-core/services/data-share.service';
import {MatCardModule} from '@angular/material/card';
import { StudentService } from '../app-core/services/student.service';
import { DialogsComponent } from './dialogs/dialogs.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';
import { ConfirmationComponent } from '../app-shared/component/confirmation/confirmation.component';
@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ViewStudentComponent,
    EditStudentComponent,
    AddStudentComponent,
    ListStudentsComponent,
    DialogsComponent,
    ConfirmationComponent
  ],
  entryComponents: [ DialogsComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    LoadersCssModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [DataShareService , StudentService]
})
export class DashboardModule { }
