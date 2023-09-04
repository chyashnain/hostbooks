import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  student: Student | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    if (this.student) {
      // Populate form with existing student data (for editing)
      this.form.patchValue({
        name: this.student.name,
        email: this.student.email,
        password: this.student.password,
      });
    }
  }

  OnSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.student) {
        // Update student data (if editing)
        const updatedStudent: Student = {
          ...this.student,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

        this.studentService.updateStudent(updatedStudent).subscribe(
          () => {
            console.log('Student updated successfully.');
            this.activeModal.close(); // Close the modal
          },
          (error) => {
            console.error('Error updating student:', error);
          }
        );
      } else {
        // Add new student data
        this.studentService.submitFormData(formData).subscribe(
          (response) => {
            console.log('Data submitted successfully:', response);
            this.activeModal.close(response); // Close the modal
          },
          (error) => {
            console.error('Error submitting data:', error);
          }
        );
      }
    }
    location.reload();
  }
}
