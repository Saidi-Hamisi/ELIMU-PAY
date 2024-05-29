import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeecategoryService {

  constructor(private _http: HttpClient) { }

  addFeecategory(data: any): Observable<any>{
    return this._http.post('http://192.168.91.251:8000/api/v1/feecategories/categories/create/', data);
  }

  getFeecategoryList(): Observable<any> {
    return this._http.get('http://192.168.91.251:8000/api/v1/feecategories/categories/listcategories');
  }

  deleteFeeCategory(id: number): Observable<any> {
    return this._http.delete(`http://192.168.91.251:8000/api/v1/feecategories/fee-categories/${id}`);
  }

  updateFeecategory(id: number, data: any): Observable<any> {
    return this._http.put(`http://192.168.91.251/api/v1/feecategories/fee-categories/${id}`, data);
  }
}
