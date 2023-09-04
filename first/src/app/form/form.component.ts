import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  OnSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.studentService.submitFormData(formData).subscribe(
        (response) => {
          console.log('Data submitted successfully:', response);
          // Reset the form
          this.form.reset();

        },
        (error) => {
          console.error('Error submitting data:', error);
        }
      );
    }
   location.reload();
  }
}
