import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditformComponent } from '../editform/editform.component';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  students!: Student[];
  constructor(private studentService: StudentService, private obj: NgbModal) {}
  students$!: Observable<Student[]>;

  ngOnInit() {
    this.students$ = this.studentService.getStudentList();
  }

  openModal(student: Student) {
    const modalRef = this.obj.open(EditformComponent, { centered: true });
    modalRef.componentInstance.student = student; // Pass the selected student to the modal
  }
  deleteStudent(student: Student) {
    if (confirm('Are you sure you want to delete this student?')) {
      if (student.id !== undefined) {
      this.studentService.deleteStudent(student.id).subscribe(() => {
        // Remove the deleted student from the array
        this.students$ = this.students$.pipe(
          map((students) => students.filter((s) => s.id !== student.id))
        );
      });
    }
    location.reload();
  }
}
}
