import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const hasRole = this.authService.getUserRoles().includes('ADMIN') || this.authService.getUserRoles().includes('SUPERADMIN');
    if (!hasRole) {
      this.router.navigate(['/accueil']);
    }
    return hasRole;
  }
}
