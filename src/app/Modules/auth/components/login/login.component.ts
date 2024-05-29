import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/@Core/Authservice/auth.service';
import { TokenStorageService } from 'src/@Core/Authservice/token-storage.service';
import { NotificationService } from 'src/@Core/helpers/NotificationService/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
submitlog() {
throw new Error('Method not implemented.');
}
  loginForm!: FormGroup
  errorMsg: any
  loading: boolean = false

  constructor(private route: Router, private fb: FormBuilder,private authService: AuthService, private storageService: TokenStorageService, private notificationService: NotificationService){this.initForm()}

  ngOnInit(): void {
      
  }


  initForm(): void{
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  
submit() {
  // un comment when connected to backend
  // this.route.navigate(['dashboardAdmin'])

  // comment this out when the backend is connected
  this.loading = true
  if(this.loginForm.valid) {
    window.localStorage.removeItem('auth-token');
    window.localStorage.removeItem('auth-user');

    this.authService.login(this.loginForm.value).subscribe({
      next: (result: any) => {
        if(result.status === 200) {
          this.storageService.saveUser(result.entity);
        
          const token =this.storageService.getToken()
          if(token) {
             this.route.navigate(['admin/home']);
          } else {
            this.route.navigate(['otp'])
          }
          this.loading = false;
          // this.route.navigate(['admin/home']);

          this.notificationService.alertSuccess(result.message)
        } else {
          this.loading = false;
          this.notificationService.alertWarning(result.message)
          this.errorMsg = result.message
        }
      },
      error: (error: any) => {
        this.loading = false
        console.log(error)
        this.errorMsg = error.statusText
        this.notificationService.alertWarning(error.statusText)
      },
      complete: () => {}
    })
  }
}

get username () {
  return this.loginForm.get('username');
}

get password() {
  return this.loginForm.get('password');
}
}
