import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/app-shared/models/student';
import { StudentService } from 'src/app/app-core/services/student.service';
import { ConfirmationComponent } from 'src/app/app-shared/component/confirmation/confirmation.component';
import { DataShareService } from 'src/app/app-core/services/data-share.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  student: Student;
  studentForm: FormGroup;
  dialogRef: MatDialogRef<ConfirmationComponent>;
  labelPosition: 'after';
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private studentService: StudentService,
    private router: Router,
    private dataShareService: DataShareService
    ) {}

    categories = [
      {value: 'domestic', viewValue: 'Domestic'},
      {value: 'international', viewValue: 'International'}
    ];

  ngOnInit() {
    this.buildStudentForm();
    this.setStudentCategoryValidators();
  }

  private buildStudentForm() {
    this.studentForm = this.formBuilder.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      fatherName: [null, Validators.required],
      motherName: [null, Validators.required],
      lastClassScore: [null, [Validators.required]],
      domicileCertificate: [null],
      birthCertificate: [null],
      previousMarkSheet: [null],
      policeClearance: [null],
      passport: [null],
      signedDeclaration: [null]
    });
  }

  private setStudentCategoryValidators() {
    const domicileCertificate = this.studentForm.get('domicileCertificate');
    const birthCertificate = this.studentForm.get('birthCertificate');
    const previousMarkSheet = this.studentForm.get('previousMarkSheet');
    const policeClearance = this.studentForm.get('policeClearance');
    const passport = this.studentForm.get('passport');
    const signedDeclaration = this.studentForm.get('signedDeclaration');
    this.studentForm.get('category').valueChanges.subscribe(selectedCategory => {
      if (selectedCategory === 'domestic') {
        this.setDomicileCertificateValidator(true, domicileCertificate);
        this.setBirthCertificateValidator(true, birthCertificate);
        this.setPreviousMarksheetValidator(true, previousMarkSheet);
        this.setPoliceClearanceValidator(false, policeClearance);
        this.setPassportValidator(false, passport);
        this.setSignedDeclarationValidator(true, signedDeclaration);
      }
      if (selectedCategory === 'international') {
        this.setDomicileCertificateValidator(true, domicileCertificate);
        this.setBirthCertificateValidator(true, birthCertificate);
        this.setPreviousMarksheetValidator(true, previousMarkSheet);
        this.setPoliceClearanceValidator(true, policeClearance);
        this.setPassportValidator(true, passport);
        this.setSignedDeclarationValidator(true, signedDeclaration);
      }
      domicileCertificate.updateValueAndValidity();
      birthCertificate.updateValueAndValidity();
      previousMarkSheet.updateValueAndValidity();
      policeClearance.updateValueAndValidity();
      passport.updateValueAndValidity();
      signedDeclaration.updateValueAndValidity();
    });
  }

  private setDomicileCertificateValidator(isRequired, domicileCertificate) {
    if (isRequired) {
      domicileCertificate.setValidators([Validators.requiredTrue]);
    } else {
      domicileCertificate.setValidators(null);
    }
  }

  private setBirthCertificateValidator(isRequired, birthCertificate) {
    if (isRequired) {
      birthCertificate.setValidators([Validators.requiredTrue]);
    } else {
      birthCertificate.setValidators(null);
    }
  }

  private setPreviousMarksheetValidator(isRequired, previousMarkSheet) {
    if (isRequired) {
      previousMarkSheet.setValidators([Validators.requiredTrue]);
    } else {
      previousMarkSheet.setValidators(null);
    }
  }

  private setPoliceClearanceValidator(isRequired, policeClearance) {
    if (isRequired) {
      policeClearance.setValidators([Validators.requiredTrue]);
    } else {
      policeClearance.setValidators(null);
    }
  }

  private setPassportValidator(isRequired, passport) {
    if (isRequired) {
      passport.setValidators([Validators.requiredTrue]);
    } else {
      passport.setValidators(null);
    }
  }

  private setSignedDeclarationValidator(isRequired, signedDeclaration) {
    if (isRequired) {
      signedDeclaration.setValidators([Validators.requiredTrue]);
    } else {
      signedDeclaration.setValidators(null);
    }
  }
  resetFormElements() {
    this.studentForm.controls.name.setValue('');
    this.studentForm.controls.category.setValue('');
    this.studentForm.controls.dateOfBirth.setValue(null);
    this.studentForm.controls.fatherName.setValue('');
    this.studentForm.controls.motherName.setValue('');
    this.studentForm.controls.lastClassScore.setValue(null);
    this.studentForm.controls.birthCertificate.setValue(null);
    this.studentForm.controls.domicileCertificate.setValue(null);
    this.studentForm.controls.passport.setValue(null);
    this.studentForm.controls.policeClearance.setValue(null);
    this.studentForm.controls.previousMarkSheet.setValue(null);
    this.studentForm.controls.signedDeclaration.setValue(null);
  }

  onSubmit() {
    this.dialogRef = this.dialog.open(ConfirmationComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.message = 'Are you sure you want to add?';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.student = {
          name: this.studentForm.value.name,
          category: this.studentForm.value.category,
          fatherName: this.studentForm.value.fatherName,
          motherName: this.studentForm.value.motherName,
          lastClassScore: this.studentForm.value.lastClassScore,
          birthCertificate: this.studentForm.value.birthCertificate,
          domicileCertificate: this.studentForm.value.domicileCertificate,
          passport: this.studentForm.value.passport,
          policeClearance: this.studentForm.value.policeClearance,
          previousMarkSheet: this.studentForm.value.previousMarkSheet,
          dateOfBirth: this.studentForm.value.dateOfBirth,
          signedDeclaration: this.studentForm.value.signedDeclaration
        };
        this.studentService.addStudent(this.student).subscribe(data => {
          this.snackBar.open('Student added successfully', 'Dismiss', {
            duration: 3000,
          });
            this.dataShareService.setData('isListTab', true);
        });
      }
      this.resetFormElements();
      this.dialogRef = null;
    });
  }

  // back() {
  //   this.router.navigate(['/dashboard']);
  // }

}
