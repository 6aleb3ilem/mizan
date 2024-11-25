import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from './LoginRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginRequest: LoginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/page1']); // Redirect to the home page or dashboard after login
      },
      error: (err) => {
        this.errorMessage = 'Email or password is incorrect';
      }
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  goBack() {
    this.router.navigate(['/accueil']);
  }
}
