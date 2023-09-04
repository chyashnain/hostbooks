import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css'],
})
export class EditformComponent implements OnInit {
  @Input() student!: Student; // Receive student data from parent component
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private studentService: StudentService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.student) {
      // Populate form with existing student data
      this.form.patchValue({
        name: this.student.name,
        email: this.student.email,
        password: this.student.password,
      });
    }
  }

  updateStudent() {
    if (this.form.valid) {
      const updatedStudent: Student = {
        ...this.student,
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.studentService.updateStudent(updatedStudent).subscribe(() => {
        // Close the modal after updating
        this.activeModal.close();
      });
    }
   // location.reload();
  }
}
