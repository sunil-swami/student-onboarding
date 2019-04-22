import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/app-shared/models/user';
import { DataShareService } from 'src/app/app-core/services/data-share.service';
import { StudentService } from '../app-core/services/student.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userDisplayName = '';
  showLoader;
  selected = new FormControl(0);
  isOnBoardForm = true;
  isEditOnBoardForm = false;
  isViewOnBoardForm = false;
  constructor(private dataShareService: DataShareService, private studentService: StudentService) {

  this.dataShareService.loaderStatus.subscribe((val: boolean) => {
    this.showLoader = val;
  });
  // for on borad tab navigation
  this.dataShareService.data
    .subscribe(item => {
          // handle on board views.
        if (item.isEditOnBoardForm) {
            this.isOnBoardForm = false;
            this.isViewOnBoardForm = false;
            this.isEditOnBoardForm =  true;
            this.selected.setValue(0);
           //
          } else if (item.isViewOnBoardForm) {
            this.isOnBoardForm = false;
            this.isEditOnBoardForm = false;
            this.isViewOnBoardForm = true;
            this.selected.setValue(0);
          } else{
              this.isEditOnBoardForm = false;
              this.isViewOnBoardForm = false;
              this.isOnBoardForm = true;
              this.selected.setValue(0);
          }
          if (item.isListTab) {
            this.selected.setValue(1);
          }
    });

  }
  ngOnInit() {
    const currentUser: User = JSON.parse(localStorage.getItem('logedInUser'));
    this.userDisplayName =  currentUser.firstName + ' ' + currentUser.lastName;

    this.studentService.initializeStudents().subscribe(data => {
            // initialize students data
      this.dataShareService.setData('studentsList', data);
        });
  }

}
