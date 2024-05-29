import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeeCollectionsService {

  private totalFeeEndpoint = 'http://192.168.90.64:8000/api/v1/payfee/calculate_total_fee/';
  private transactionEndpoint = 'http://192.168.90.64:8000/api/v1/payfee/api/v1/fee/list_transaction';

  constructor(private http: HttpClient) { }

  getTotalFeeCollections(): Observable<any> {
    return this.http.get<any>(this.totalFeeEndpoint);
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.transactionEndpoint);
  }
}
