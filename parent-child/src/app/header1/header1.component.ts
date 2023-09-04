// import { Component, OnInit } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { StudentService } from '../student.service';
// import { Student } from '../student';
// import { Observable } from 'rxjs';
// import { FormComponent } from '../form/form.component';
// import { PageEvent } from '@angular/material/paginator';

// @Component({
//   selector: 'app-header1',
//   templateUrl: './header1.component.html',
//   styleUrls: ['./header1.component.css'],
// })
// export class Header1Component implements OnInit {
//   constructor(
//     private modalService: NgbModal,
//     private studentService: StudentService
//   ) {}
//   totalStudents!: number;
//   pageSizeOptions: number[] = [5, 10, 25, 100];
//   // pageEvent!: PageEvent;
//   pageEvent: PageEvent = new PageEvent(); // for
//   currentPage = 0;
//   students$!: Observable<Student[]>;
//   // ngOnInit() {
//   //   this.loadStudents(0, 10); // Initial load
//   // }
//   ngOnInit() {
//     this.loadStudents(0, this.pageSizeOptions[0]); // for sorting Initial load with the first pageSizeOption
//   }
//   // loadStudents(page: number, size: number) {
//   //   this.students$ = this.studentService.getStudentList(page, size);
//   //   this.studentService.getTotalStudentCount().subscribe(count => {
//   //     this.totalStudents = count;
//   //   });
//   //   this.currentPage=page;

//   // }
//   selectedSort: string = 'id';

//   sortStudents() {
//     this.loadStudentssort(0, this.pageSizeOptions[0], this.selectedSort);
//   }

//   loadStudentssort(page: number, sortField: string) {
//     const pageSize = this.pageSizeOptions[this.pageEvent.pageSize];
//     this.students$ = this.studentService.getStudentListSort(page, pageSize, sortField);
//     this.studentService.getTotalStudentCount().subscribe(count => {
//       this.totalStudents = count;
//     });
//     this.currentPage = page;
//   }



//   onPageChange(event: PageEvent) {
//     const pageIndex = event.pageIndex;
//     const pageSize = event.pageSize;
//     this.pageEvent = event; //for sorting
//     this.loadStudents(pageIndex, pageSize);
//   }

//   deleteStudent(student: Student) {
//     if (confirm('Are you sure you want to delete this student?')) {
//       if (student.id !== undefined) {
//         this.studentService.deleteStudent(student.id).subscribe(() => {
//           this.loadStudents(
//             this.currentPage,
//             this.pageSizeOptions[this.pageEvent.pageSize]
//           );
//         });
//       }
//     }
//     location.reload();
//   }

//   // openModal(student?: Student) {
//   //   const modalRef = this.modalService.open(FormComponent, { centered: true });
//   //   modalRef.componentInstance.student = student || null;

//   //   modalRef.result.then((newlyAddedStudent: Student) => {
//   //     if (newlyAddedStudent) {
//   //       // Update the student list with the newly added student
//   //       this.students$ = this.studentService.getStudentList(
//   //         this.currentPage,
//   //         this.pageSizeOptions[this.pageEvent.pageSize]
//   //       );
//   //     }
//   //   });
//   // }


//   ///for sorting
//   openModal(student?: Student) {
//     const modalRef = this.modalService.open(FormComponent, { centered: true });
//     modalRef.componentInstance.student = student || null;

//     modalRef.result.then((newlyAddedStudent: Student) => {
//       if (newlyAddedStudent) {
//         // Update the student list with the newly added student
//         this.students$ = this.studentService.getStudentList(
//           this.currentPage,
//           this.pageSizeOptions[0]
//         );
//       }
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { Observable } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css'],
})
export class Header1Component implements OnInit {
  constructor(
    private modalService: NgbModal,
    private studentService: StudentService
  ) {}

  totalStudents!: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent = new PageEvent();
  currentPage = 0;
  students$!: Observable<Student[]>;
  selectedSort: string = 'id';
  selectedSortOrder: string = 'asc';
  searchQuery: string = ''

  ngOnInit() {
    this.pageEvent.pageSize = this.pageSizeOptions[0];
    this.loadStudentssort(0, this.pageSizeOptions[0], this.selectedSort);
  }
searchStudents(){
  this.students$= this.studentService.searchStudents(this.searchQuery);
}
  sortStudents() {
    this.loadStudentssort(this.currentPage, this.pageEvent.pageSize, this.selectedSort);
  }

  loadStudentssort(page: number, size: number, sortField: string) {
    const isAscending = this.selectedSortOrder === 'asc';

    this.students$ = this.studentService.getStudentListSort(page, size, sortField, isAscending);
    this.studentService.getTotalStudentCount().subscribe(count => {
      this.totalStudents = count;
    });
    this.currentPage = page;
  }

  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.pageEvent = event;
    this.loadStudentssort(pageIndex, pageSize, this.selectedSort);
  }

  deleteStudent(student: Student) {
    if (confirm('Are you sure you want to delete this student?')) {
      if (student.id !== undefined) {
        this.studentService.deleteStudent(student.id).subscribe(() => {
          this.loadStudentssort(this.currentPage, this.pageEvent.pageSize, this.selectedSort);
        });
      }
    }
   location.reload() ;
  }

  openModal(student?: Student) {
    const modalRef = this.modalService.open(FormComponent, { centered: true });
    modalRef.componentInstance.student = student || null;

    modalRef.result.then((newlyAddedStudent: Student) => {
      if (newlyAddedStudent) {
        this.loadStudentssort(this.currentPage, this.pageEvent.pageSize, this.selectedSort);
      }
    });
  }
}
