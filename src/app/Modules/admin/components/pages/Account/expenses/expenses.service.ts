import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ExpensesService {
  constructor(private _http: HttpClient) {}
  addExpenses(data: any): Observable<any> {
    // Replace the endpoint with your actual API endpoint
    console.log("data", data);
    const url = `${environment.apiUrl}expenses/expenses/`;
    return this._http.post<any>(url, data);
  }
   
  updateExpenses(id: number, data: any): Observable<any> {
    // Replace the endpoint with your actual API endpoint
    const url = `${environment.apiUrl}expenses/expenses${id}`
    return this._http.put(url, data);
  }

  getExpensesList(): Observable<any> {
    const url = `${environment.apiUrl}expenses/expenses`
    // Replace the endpoint with your actual API endpoint
    return this._http.get(url);
  }
   
  deleteExpenses(id: number): Observable<any> {
    // Replace the endpoint with your actual API endpoint
    return this._http.delete(`${environment.apiUrl}${id}`);
  }
}
