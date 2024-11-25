import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserservicesService } from '../../usermanegement/userservices.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit, OnDestroy {
  email: string = '';
  code: string = '';
  isCodeValid: boolean = true; // Variable to track if the code is valid
  codeAttempted: boolean = false; // Variable to track if an attempt to verify code was made
  codeExpirationTime: Date = new Date(); // Code expiration time
  timeRemaining: string = '';
  isResendEnabled: boolean = false;
  timerSubscription: Subscription = new Subscription();

  constructor(private userService: UserservicesService, private router: Router) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || ''; // Get email from localStorage
    this.userService.getCodeExpirationTime(this.email).subscribe(
      (expirationTime: string) => {
        this.codeExpirationTime = new Date(expirationTime);
        this.startTimer();
      },
      error => {
        console.error('Error fetching code expiration time:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe(); // Clean up the subscription when component is destroyed
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      const now = new Date().getTime();
      const expirationTime = new Date(this.codeExpirationTime).getTime();
      const timeDiff = expirationTime - now;

      if (timeDiff <= 0) {
        this.isResendEnabled = true;
        this.timeRemaining = '00:00';
        this.timerSubscription.unsubscribe();
      } else {
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        this.timeRemaining = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    });
  }

  verifyCode(event: Event) {
    event.preventDefault(); // Prevent the form from submitting normally
    this.codeAttempted = true; // Mark that a verification attempt has been made

    this.userService.verifyCode(this.email, this.code).subscribe(
      response => {
        console.log(response);
        this.isCodeValid = true; // Set to true if the code is verified successfully
        localStorage.setItem('fromVerifyCode', 'true'); // Set flag for set-password access
        this.router.navigate(['/set-password']); // Navigate to set-password
      },
      error => {
        console.error('Error verifying code:', error);
        this.isCodeValid = false; // Set to false if there is an error
      }
    );
  }

  resendCode() {
    this.userService.sendVerificationCode(this.email).subscribe(
      response => {
        console.log('Verification code resent');
        this.userService.getCodeExpirationTime(this.email).subscribe(
          (expirationTime: string) => {
            this.codeExpirationTime = new Date(expirationTime);
            this.isResendEnabled = false;
            this.startTimer(); // Restart the timer
          },
          error => {
            console.error('Error fetching new code expiration time:', error);
          }
        );
      },
      error => {
        console.error('Error resending verification code:', error);
      }
    );
  }
  goBack() {
    this.router.navigate(['/accueil']);
  }
}
