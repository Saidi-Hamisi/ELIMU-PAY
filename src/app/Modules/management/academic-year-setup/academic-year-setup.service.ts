import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicYearSetupService {
  private baseUrl: string = `${environment.apiUrl}academics/`;

  constructor(private _http: HttpClient) {}

  getBaseUrl(): string {
    return this.baseUrl;
  }

  createAcademicYear(data: any): Observable<any> {
    const url = `${this.getBaseUrl()}create/`;
    return this._http.post<any>(url, data);
  }

  getAcademicYears(): Observable<any> {
    const url = `${this.getBaseUrl()}list/`; // Endpoint to get academic years
    return this._http.get<any>(url);
  }

  deleteAcademicYear(id: number): Observable<any> {
    const url = `${this.getBaseUrl()}delete/${id}/`; // Endpoint to delete academic year
    return this._http.delete<any>(url);
  }

  updateAcademicYear(id: number, data: any): Observable<any> {
    const url = `${this.getBaseUrl()}update/${id}/`; // Endpoint to update academic year
    return this._http.put<any>(url, data);
  }
}
