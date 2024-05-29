import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class SchoolService {
  
//  getSchoolList() {
//    throw new Error('Method not implemented.');
//  }
//  deleteSchool(id: number) {
//    throw new Error('Method not implemented.');
//  }
 private apiUrl = 'your-api-url-here';
 

 constructor(private http: HttpClient) {}

 updateSchool(id: number, schoolData: any): Observable<any> {
    return this.http.put(`http://localhost:3000/School${id}`, schoolData);
 }

 addSchool(schoolData: any): Observable<any> {
    return this.http.post(`http://localhost:3000/School`, schoolData);
 }
 deleteSchool(id: number): Observable<any> {
  return this.http.delete(`http://localhost:3000/School${id}`);
 }
 getSchoolList(): Observable<any> {
  return this.http.get(`http://localhost:3000/School`);
 }
}
