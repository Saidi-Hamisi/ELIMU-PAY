// school.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private apiUrl = `${environment.apiUrl}schools/`;  // Adjusted API URL

  constructor(private http: HttpClient) {}

  addSchool(schoolData: any): Observable<any> {
    const url = `${this.apiUrl}create/`;  // Endpoint for adding a school
    return this.http.post<any>(url, schoolData);
  }

  getSchoolList(): Observable<any> {
    const url = `${this.apiUrl}list/`;  // Endpoint for listing schools
    return this.http.get<any>(url);
  }

  updateSchool(id: number, schoolData: any): Observable<any> {
    const url = `${this.apiUrl}${id}/`;  // Endpoint for updating a school
    return this.http.put<any>(url, schoolData);
  }

  deleteSchool(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;  // Endpoint for deleting a school
    return this.http.delete<any>(url);
  }
}
