import { Injectable } from '@angular/core';
import { Student } from './student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // private baseURL = 'http://localhost:8080/students/students';
  // private upUrl = 'http://localhost:8080/students/updatestudent';
  // private dltUrl = 'http://localhost:8080/students/delete';
  private baseURL = 'http://localhost:8080/students/get/all';
  private upUrl = 'http://localhost:8080/students/update';
  private dltUrl = 'http://localhost:8080/students/delete';

  constructor(private http: HttpClient) {}

  getStudentList(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseURL);
  }
  submitFormData(formData: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/students/add'; // Replace with your API URL
    return this.http.post(apiUrl, formData);
  }
  updateStudent(student: Student): Observable<Student> {
    const url = `${this.upUrl}/${student.id}`;
    return this.http.put<Student>(url, student);
  }
  deleteStudent(id: number): Observable<void> {
    const url = `${this.dltUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
