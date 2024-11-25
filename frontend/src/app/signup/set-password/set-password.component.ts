import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserservicesService } from '../../usermanegement/userservices.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  passwordInvalid: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showConfirmationModal: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserservicesService, private router: Router) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || ''; // Get email from localStorage
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  setPassword() {
    this.passwordMismatch = this.password !== this.confirmPassword;
    this.passwordInvalid = !this.validatePassword(this.password);

    if (this.passwordMismatch || this.passwordInvalid) {
      return;
    }

    this.userService.setPassword(this.email, this.password).subscribe(response => {
      console.log(response);
      this.showConfirmationModal = true;
      setTimeout(() => {
        this.router.navigate(['/accueil']);
        localStorage.removeItem('fromSendVerification');
        localStorage.removeItem('fromVerifyCode');
      }, 3000); // Redirection après 3 secondes
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  closeConfirmationModal() {
    this.showConfirmationModal = false;
    this.router.navigate(['/accueil']);
  }
  goBack() {
    this.router.navigate(['/accueil']);
  }
}
