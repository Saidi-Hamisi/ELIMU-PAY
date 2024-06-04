import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private baseUrl = `${environment.apiUrl}expenses/expenses/`;

  constructor(private _http: HttpClient) {}

  // For creating a new expense
  addExpenses(data: any): Observable<any> {
    console.log("data", data);
    return this._http.post<any>(this.baseUrl, data);
  }
   
  // For updating an existing expense by ID
  updateExpenses(id: number, data: any): Observable<any> {
    const url = `${this.baseUrl}${id}/`;
    return this._http.put<any>(url, data);
  }

  // For fetching the list of expenses
  getExpensesList(): Observable<any> {
    const url = `${this.baseUrl}`
    return this._http.get<any>(url);
  }
   
  // For deleting an expense by ID
  deleteExpenses(id: number): Observable<any> {
    const url = `${this.baseUrl}${id}/`;
    return this._http.delete<any>(url);
  }
}
