import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from 'src/app/app-shared/models/student';
import {  Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class StudentService {
    constructor(private http: HttpClient) { }
    private apiUrl = 'api';
    studentsList: BehaviorSubject<Student[]>;

    initializeStudents(): Observable<any> {
        if (this.studentsList) {
            return new Observable<Student[]>((observer) => {
              observer.next(this.studentsList.getValue());
              observer.complete();
            });
          } else {
            this.studentsList = new BehaviorSubject([]);
            return this.http.get<Student[]>(`./assets/students-data.json`)
            .pipe(tap(data => {this.studentsList.next(data);
            console.log(this.studentsList);
            }));
          }
    }

      addStudent(student: Student): Observable<void> {
        return new Observable<void>((observer) => {
          const currentData = this.studentsList.getValue();
          const nextId = Math.max.apply(Math, currentData.map((o) => {
            return o.id;
          })) + 1;
          student.id = nextId;
          this.studentsList.next([...currentData, student]);
          observer.next();
          console.log(this.studentsList);
          observer.complete();
        });
      }
      deleteStudent(id: number): Observable<Student[]> {
        return new Observable<Student[]>((observer) => {
          observer.next(this.studentsList.getValue().filter((element) => {
            return element.id !== id;
          }));
          observer.complete();
        }).pipe(tap(data => {this.studentsList.next(data);
        console.log(this.studentsList);
        }));
      }

      updateStudent(student: Student): Observable<void> {
        return new Observable<void>((observer) => {
          const studentCurrentData = this.studentsList.getValue();
          const index = studentCurrentData.findIndex(ele => ele.id === student.id);
          studentCurrentData[index] = student;
          this.studentsList.next(studentCurrentData);
          observer.next();
          console.log(this.studentsList);
          observer.complete();
        });
      }


}
