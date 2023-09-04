import { Injectable } from '@angular/core';
import { Student } from './student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseURL = 'http://localhost:8080/students';
  private upUrl = 'http://localhost:8080/students/update';
  private dltUrl = 'http://localhost:8080/students/delete';

  constructor(private http: HttpClient) {}
  // getStudentList(page: number, size: number): Observable<Student[]> {
  //   const url = `${this.baseURL}/page?page=${page}&size=${size}`;
  //   return this.http.get<Student[]>(url);
  // }
  getTotalStudentCount(): Observable<number> {
    const url = `${this.baseURL}/count`;
    return this.http.get<number>(url);
  }
  searchStudents(query: string): Observable<Student[]> {
    const url = `${this.baseURL}/search?query=${query}`;
    return this.http.get<Student[]>(url);
  }
  // getStudentListSort(page: number, size: number, sortField: string): Observable<Student[]> {
  //   throw new Error('Method not implemented.');
  // }
  getStudentListSort(page: number, size: number, sortField: string,isAscending: boolean): Observable<Student[]> {
    const url = `${this.baseURL}/sorted?page=${page}&size=${size}&sortField=${sortField}&isAscending=${isAscending}`;
    return this.http.get<Student[]>(url);
  }
  submitFormData(formData: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/students/add';
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
