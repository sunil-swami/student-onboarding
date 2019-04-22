import { Component, OnInit, ElementRef } from '@angular/core';
import { Student } from 'src/app/app-shared/models/student';
import { DataShareService } from 'src/app/app-core/services/data-share.service';
import { StudentService } from 'src/app/app-core/services/student.service';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { ConfirmationComponent } from 'src/app/app-shared/component/confirmation/confirmation.component';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  studentsList: Student[] = [];
  dialogRef: MatDialogRef<ConfirmationComponent>;
  studentsData: Student[];
  selected = 'All';
  constructor(private dataShareService: DataShareService, private studentService: StudentService, private snackBar: MatSnackBar,
    private elementRef: ElementRef, private dialog: MatDialog) {

  }

  categories = [
    {value: 'domestic', viewValue: 'Domestic'},
    {value: 'international', viewValue: 'International'},
    {value: 'All', viewValue: 'All'}
  ];

  ngOnInit() {
    this.studentService.studentsList
      .subscribe(item => {
        this.studentsData = item;

        // this.studentsData.forEach((ele) => {
        //   this.studentsList.push(ele);
        // });
        this.assignCopy();
      });
  }

  assignCopy(){
    this.studentsList = Object.assign([], this.studentsData);
 }
 filterItem (value){
    if(!value){
        this.assignCopy();
    }
    this.studentsList = Object.assign([], this.studentsData).filter(
       item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
 }

  onSelect(val){
    if ((val !== 'domestic') && (val !== 'international')) {
      this.studentsList = this.studentsData;
    } else {
      this.studentsList = this.studentsData.filter(x => x.category === val);
    }
  }

  setEditForm(student) {
    this.dataShareService.setData('isEditOnBoardForm', true);
    this.dataShareService.setData('isViewOnBoardForm', false);
    this.dataShareService.setData('studentContext', student);
    this.dataShareService.setData('isListTab', false);
  }
  setViewForm(student) {
    this.dataShareService.setData('isViewOnBoardForm', true);
    this.dataShareService.setData('isEditOnBoardForm', false);
    this.dataShareService.setData('studentContext', student);
    this.dataShareService.setData('isListTab', false);
  }
  openConfirmationDialog(student): void {
    this.dialogRef = this.dialog.open(ConfirmationComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.message = 'Are you sure you want to delete?';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.deleteStudent(student.id).subscribe((data) => {
          this.snackBar.open('Student deleted successfully', 'Dismiss', {
            duration: 3000,
          });
        });
      }
    });
}
}
9