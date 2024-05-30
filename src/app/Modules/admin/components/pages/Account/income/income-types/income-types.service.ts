import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeTypesService {
 
  constructor(private _http: HttpClient) { }

  addIncomeTypes(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/users/', data);
  }

  updateSystemUser(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/users/${id}`, data);
  }

  getSystemUserList(): Observable<any> {
    return this._http.get('http://localhost:3000/users');
  }

  deleteSystemUser(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/users/${id}`);
  }

  getFeeCollection(): Observable<any> {
    return this._http.get('http://192.168.89.139:8000/api/v1/payfee/calculate_total_fee/');
  }
}
