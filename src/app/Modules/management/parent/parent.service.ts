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
      'http://192.168.91.228:8000/api/v1/parents/parents/',
      data
    );
    console.log(res);
    return res;
  }

  updateParent(id: number, data: any): Observable<any> {
    return this._http.put(`http://192.168.88.228:8001/api/v1/users/update/${id}`, data);
  }

  getParentList(): Observable<any> {
    return this._http.get('http://192.168.91.228:8000/api/v1/users/list/');
  }

  deleteParent(id: number): Observable<any> {
    return this._http.delete(
      `http://192.168.88.223:8001/api/v1/users/delete/${id}`
    );
  }
}
