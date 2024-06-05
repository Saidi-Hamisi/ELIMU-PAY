import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsBaseUrl = `${environment.apiUrl}students/`;

  constructor(private _http: HttpClient) { }

  addStudent(data: any): Observable<any> {
    console.log('saving student');
    const url = `${this.studentsBaseUrl}students/create/`;
    return this._http.post(url, data);
  }

  updateStudent(id: number, data: any): Observable<any> {
    console.log('saving student');
    console.log('data', data);
    const url = `${this.studentsBaseUrl}${id}/`;
    return this._http.put<any>(url, data);
  }

  getStudentList(): Observable<any> {
    return this._http.get(`${this.studentsBaseUrl}?page=1`);
  }

  deleterecord(url: string): Observable<any> {
    return this._http.delete(url);
  }

  getStudentDetails(uniqueId: string): Observable<any> {
    return this._http.get(`${this.studentsBaseUrl}${uniqueId}`);
  }
}
