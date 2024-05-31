import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { ExpenseModel } from '../components/pages/Account/expenses/add-expense/Expense';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor( private http : HttpClient) { }

  apiurl='http://102.210.244.99:8003/'
  headers= new HttpHeaders().set('Content type','application/json')

  //GetExpense() {
    
   // return this.http.get<ExpenseModel[]>(this.apiurl)
   
 // }

  feeStatement(data: any): Observable<any> {
    let API_URL = `http://192.168.89.193:8000/api/v1/students/student/list_student_virtual_account?page=1
    `;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {

      console.log(res , "response")
      return res || {}
    }), 

    )
  }
}
