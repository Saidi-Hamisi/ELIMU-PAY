import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  constructor(private _http: HttpClient) { }

  addStaff(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/staff', data);
  }
  updateStaff(id: number,data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/staff/${id}`, data);
  }
  getStaffList(): Observable<any> {
    return this._http.get('http://localhost:3000/staff');
}
 deleteStaff(id:number):Observable<any> {
  return this._http.delete(`http://localhost:3000/staff/${id}`);
   
 }
}
