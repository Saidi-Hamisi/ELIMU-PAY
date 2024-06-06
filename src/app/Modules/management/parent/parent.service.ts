import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  constructor(private _http: HttpClient) {}

  addParent(data: any): Observable<any> {
    console.log('saving user');
    var res = this._http.post(
      'http://192.168.89.15:8000/api/v1/parents/parents/',
      data
    );
    console.log(res);
    return res;
  }

  updateParent(id: number, data: any): Observable<any> {
    return this._http.put(`http://192.168.89.15:8000/api/v1/parents/parents/6/}`, data);
  }

  getParentList(): Observable<any> {
    return this._http.get('http://192.168.89.15:8000/api/v1/parents/parents/');
  }

  deleteParent(id: number): Observable<any> {
    return this._http.delete(
      `http://192.168.89.15:8000/api/v1/parents/delete/${id}`
    );
  }
}
