import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/@Core/Authservice/auth.service';
import { TokenStorageService } from 'src/@Core/Authservice/token-storage.service';
import { NotificationService } from 'src/@Core/helpers/NotificationService/notification.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit, AfterViewInit {
  otpForm!: FormGroup;
  errorMsg: any;
  loading: boolean = false;
  email: any;
  verificationMessage: string = '';

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: TokenStorageService,
    private notificationService: NotificationService,

    private renderer: Renderer2
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    const user = this.storageService.getUser();

    if (user) {
      this.email = user.email;
    }
    this.otpForm.get('email')?.patchValue(this.email);
    this.requestOtp(this.email);
  }

  ngAfterViewInit(): void {
    const otpFields = document.querySelectorAll('.otp-field');

    otpFields.forEach((field, index) => {
      this.renderer.listen(field, 'input', (e) => {
        const input = e.target as HTMLInputElement;
        if (input.value.length === 1 && index < otpFields.length - 1) {
          (otpFields[index + 1] as HTMLElement).focus();
        }
      });
    });
  }

  initForm() {
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.maxLength(1)]],
      otp2: ['', [Validators.required, Validators.maxLength(1)]],
      otp3: ['', [Validators.required, Validators.maxLength(1)]],
      otp4: ['', [Validators.required, Validators.maxLength(1)]],
      otp5: ['', [Validators.required, Validators.maxLength(1)]],
      otp6: ['', [Validators.required, Validators.maxLength(1)]],

      email: ['', [Validators.required, Validators.email]],
    });
  }

  verifyOtp(): void {
    const otp = this.generateOtp();

    const body = {
      otp: otp,
      email: this.otpForm.get('email')?.value,
    };

    if (this.otpForm.valid) {
      this.authService.verifyOtp(body).subscribe({
        next: (result: any) => {
          this.verificationMessage = 'OTP has been successfully verified';
          this.storageService.saveToken(result.entity.access_token);
        },
        error: (error) => {
          this.verificationMessage = 'Failed to verify OTP. Please try again.';
          console.log(error);
        },
        complete: () => {
          this.route.navigate(['/admin/home']);
        },
      });
    }
  }

  requestOtp(email: any): void {
    const body = { email: email };
    this.authService.requestOtp(body).subscribe({
      next: (result: any) => {
        if (result.status === 200) {
          console.log(result.message);
          this.verificationMessage = result.message;
        } else {
          this.verificationMessage = result.message;
          console.log(result.message);
        }
      },
      error: (error) => {
        console.log(error);
        this.verificationMessage = error.statusText;
      },
      complete: () => {},
    });
  }

  generateOtp(): string {
    const otp1 = this.otpForm.get('otp1')?.value;
    const otp2 = this.otpForm.get('otp2')?.value;
    const otp3 = this.otpForm.get('otp3')?.value;
    const otp4 = this.otpForm.get('otp4')?.value;
    const otp5 = this.otpForm.get('otp5')?.value;
    const otp6 = this.otpForm.get('otp6')?.value;

    return otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
  }
}
