import { Component, OnInit } from '@angular/core';
import { NavigationService } from './navigation.service';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showReferences: boolean = false;
  showLogoutModal: boolean = false;

  constructor(public navService: NavigationService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // console.log("User roles:", this.authService.getUserRoles());
  }

  hasRole(role: string): boolean {
    const userRoles = this.authService.getUserRoles();
    // console.log("Checking role:", role, "in", userRoles);
    return userRoles.includes(role);
  }

  toggleReferences() {
    this.showReferences = !this.showReferences;
  }

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    this.authService.logout();
    this.closeLogoutModal();
    this.router.navigate(['/accueil']);
  }
}
