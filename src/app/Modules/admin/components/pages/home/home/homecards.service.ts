import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomecardsService {

  private totalIncomeUrl = 'http://192.168.90.64:8000/api/v1/payfee/calculate_total_fee/';
  private totalExpensesUrl = 'http://192.168.88.198:8000/api/v1/expenses/expenses/calculate_total/';
  private totalSupplierAmountUrl = 'http://192.168.88.198:8000/api/v1/suppliers/suppliers/calculate_total_amount/'; // Add the URL for total supplier amount

  constructor(private http: HttpClient) { }

  getTotalIncome(): Observable<any> {
    return this.http.get<any>(this.totalIncomeUrl);
  }

  getTotalExpenses(): Observable<any> {
    return this.http.get<any>(this.totalExpensesUrl);
  }

  getTotalSupplierAmount(): Observable<any> {
    return this.http.get<any>(this.totalSupplierAmountUrl);
  }
}
