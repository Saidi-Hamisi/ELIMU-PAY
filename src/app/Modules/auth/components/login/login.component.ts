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
  loginForm!: FormGroup;
  errorMsg: string | undefined;
  loading = false;
  passwordVisible = false;
  passwordFieldType = 'password';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private notificationService: NotificationService
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    this.loading = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (result: any) => {
          if (result.status === 200) {
            this.tokenStorageService.saveUser(result.entity);
            const isFirstLogin = result.entity.isFirstLogin;
            if (isFirstLogin) {
              this.router.navigate(['passwordreset']);
            } else {
              this.router.navigate(['otp']);
            }
            this.loading = false;
            this.notificationService.alertSuccess(result.message);
          } else {
            this.loading = false;
            this.notificationService.alertWarning(result.message);
            this.errorMsg = result.message;
          }
        },
        error: (error: any) => {
          this.loading = false;
          console.log(error);
          this.errorMsg = error.statusText;
          this.notificationService.alertWarning(error.statusText);
        }
      });
    }
  }

get username () {
  return this.loginForm.get('username');
}
   
get password() {
  return this.loginForm.get('password');
}

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

  get username(): any {
    return this.loginForm.get('username');
  }

  get password(): any {
    return this.loginForm.get('password');
  }
}
