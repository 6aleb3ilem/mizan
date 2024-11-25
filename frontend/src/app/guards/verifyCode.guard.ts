import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerifyCodeGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isFromSendVerification = localStorage.getItem('fromSendVerification');
    if (isFromSendVerification) {
      return true;
    } else {
      this.router.navigate(['/accueil']);
      return false;
    }
  }
}
