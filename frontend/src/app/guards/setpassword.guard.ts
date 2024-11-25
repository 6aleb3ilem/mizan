import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SetPasswordGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isFromVerifyCode = localStorage.getItem('fromVerifyCode');
    if (isFromVerifyCode) {
      return true;
    } else {
      this.router.navigate(['/verify-code']);
      return false;
    }
  }
}
