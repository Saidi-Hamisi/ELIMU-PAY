import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    fetchUserRoles() {
      throw new Error('Method not implemented.');
    }
    forgotPassword(email: string): Observable<any> {
        // Assuming you're making an HTTP POST request to send an email for password reset
        return this.http.post<any>(`${environment.apiUrl}auth/forgotpassword/`, { email });
    }
    constructor(private http: HttpClient) {}

    login(body: any): Observable<any>{
        return this.http.post<any>(`${environment.apiUrl}auth/login/`, body);
    }
    
    logout(): void {
        window.localStorage.removeItem('auth-user');
        window.localStorage.removeItem('auth-token');
    }

    requestOtp(email: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}auth/sendotp/`, email);
    }

    verifyOtp(body: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}auth/verifyotp/`, body);
    }

    resetPassword(body: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}auth/resetpassword/`, body);
    }
}