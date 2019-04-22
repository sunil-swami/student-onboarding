import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/app-core/services/data-share.service';
import { Student } from 'src/app/app-shared/models/student';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentContext: Student;
  labelPosition: 'after';
  constructor(private dataShareService: DataShareService) { }

  ngOnInit() {
    this.dataShareService.data
    .subscribe(item => {
        this.studentContext = item.studentContext;
    });
  }
  Back() {
    this.dataShareService.setData('isEditOnBoardForm', false);
    this.dataShareService.setData('isViewOnBoardForm', false);
    this.dataShareService.setData('isListTab', true);
  }
}
