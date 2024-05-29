import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseModel } from '../components/pages/Account/expenses/add-expense/Expense';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor( private http : HttpClient) { }

  apiurl='http://102.210.244.99:8003/'

  GetExpense() {
    
    return this.http.get<ExpenseModel[]>(this.apiurl);
  }
}
