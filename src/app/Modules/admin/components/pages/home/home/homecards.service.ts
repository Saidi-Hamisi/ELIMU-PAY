import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomecardsService {

  private totalIncomeUrl = 'http://localhost:3000/total-incomes'

  constructor(private http:HttpClient) { }

  getTotalIncome(): Observable<any>{
    return this.http.get(`${this.totalIncomeUrl}`);
  }
}
