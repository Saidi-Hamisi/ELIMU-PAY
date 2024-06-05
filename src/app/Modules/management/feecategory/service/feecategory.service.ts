import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeecategoryService {
  constructor(private _http: HttpClient) {}

  addFeecategory(data: any): Observable<any> {
    const url = `${environment.apiUrl}feecategories/fee-categories/`;
    return this._http.post<any>(url, data);
  }

  getFeecategoryList(): Observable<any> {
    const url = `${environment.apiUrl}feecategories/fee-categories/`;
    return this._http.get<any>(url);
  }

  deleteFeecategory(id: number): Observable<any> {
    const url = `${environment.apiUrl}feecategories/fee-categories/${id}`;
    return this._http.delete<any>(url);
  }

  updateFeecategory(id: number, data: any): Observable<any> {
    const url = `${environment.apiUrl}feecategories/fee-categories/${id}`;
    return this._http.put<any>(url, data);
  }
}
