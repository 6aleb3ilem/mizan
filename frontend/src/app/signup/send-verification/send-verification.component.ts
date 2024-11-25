import { Component } from '@angular/core';
import { UserservicesService } from '../../usermanegement/userservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-verification',
  templateUrl: './send-verification.component.html',
  styleUrls: ['./send-verification.component.css']
})
export class SendVerificationComponent {
  email: string = '';
  isCodeSent: boolean = false; // Variable to track if the code has been sent
  emailExistsError: boolean = false; // Variable to track if email exists

  constructor(private userService: UserservicesService, private router: Router) { }

  sendVerificationCode() {
    this.userService.emailExists(this.email).subscribe(
      response => {
        if (response.exists) {
          this.userService.sendVerificationCode(this.email).subscribe(
            response => {
              console.log(response);
              this.isCodeSent = true; // Set to true if the code is sent successfully
              this.emailExistsError = false; // Reset the error
              localStorage.setItem('email', this.email); // Store email in localStorage
              localStorage.setItem('fromSendVerification', 'true'); // Set flag for verify-code access
              this.router.navigate(['/verify-code']); // Navigate to verify-code
            },
            error => {
              console.error('Error sending verification code:', error);
              this.isCodeSent = false; // Set to false if there is an error
            }
          );
        } else {
          this.emailExistsError = true; // Set to true if email does not exist
          this.isCodeSent = false; // Reset the code sent status
        }
      },
      error => {
        console.error('Error checking email existence:', error);
        this.emailExistsError = true; // Set to true if there is an error checking email
      }
    );
  }
  goBack() {
    this.router.navigate(['/accueil']);
  }
}
