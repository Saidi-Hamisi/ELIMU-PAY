import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private _http: HttpClient) { }


  serverUrl:string = 'http://192.168.88.38:8000//api/v1';


  addStudent(data: any): Observable<any> {
    console.log('saving student');
    const url = `${this.serverUrl}/students/students/create/`
    return this._http.post(url,data);

  }

  updateStudent(id: number, data: any): Observable<any> {
    console.log('saving student');
    console.log('data', data);
    //http://192.168.90.105:8003/api/v1/students/2/

    const url = `${this.serverUrl}/students/${id}/`
    return this._http.put<any>(url,data);
  }

  getStudentList(): Observable<any> {

    return this._http.get(`${this.serverUrl}/students/?page=1`);

 
  }

  deleterecord(url:string): Observable<any> {
    return this._http.delete(url);
  }

  getStudentDetails(uniqueId: string): Observable<any> {
    return this._http.get(`${this.serverUrl}}/students/${uniqueId}`);
  }
}
