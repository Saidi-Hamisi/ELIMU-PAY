import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // Import necessary operators
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  addSystemUser(data: any): Observable<any> {
    console.log('saving user');
    var res = this._http.post(`${environment.apiUrl}users/create/`, data);
    console.log(res);
    return res;
  }

  updateSystemUser(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.apiUrl}users/update/${id}`, data);
  }

  getSystemUserList(): Observable<any> {
    return this._http.get(`${environment.apiUrl}users/list/`);
  }

  deleteSystemUser(id: number): Observable<any> {
    return this._http.delete(`${environment.apiUrl}users/delete/${id}`);
  }

  getUserGroupList(): Observable<string[]> {
    return this._http.get<any[]>(`${environment.apiUrl}usergroup/list/`).pipe(
      map((data: any) => data.entity.map((item: any) => item.name)),
      catchError((error: any) => { // Specify type for 'error'
        console.error('Error fetching user groups:', error);
        throw error;
      })
    );
  }
}
