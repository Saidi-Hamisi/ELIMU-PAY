import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  addSystemUser(data: any): Observable<any> {
    return this._http.post(`${environment.apiUrl}users/create/`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error adding user:', error.message);
          if (error.error) {
            console.error('Backend error details:', error.error);
          }
          return throwError(error);
        })
      );
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

  getUserGroupList(): Observable<{ id: number; name: string }[]> {
    return this._http.get<any>(`${environment.apiUrl}usergroup/list/`).pipe(
      map((data: any) => data.entity.map((item: any) => ({
        id: item.id, 
        name: item.name,
      }))),
      catchError((error: any) => {
        console.error('Error fetching user roles:', error);
        throw error;
      })
    );
  }

  getSchoolList(): Observable<{ id: number; name: string }[]> {
    return this._http.get<any>(`${environment.apiUrl}schools/schools/`).pipe(
      map((data: any) => data.map((item: any) => ({
        id: item.id,
        name: item.name,
      }))),
      catchError((error: any) => {
        console.error('Error fetching schools:', error);
        throw error;
      })
    );
  }
}
