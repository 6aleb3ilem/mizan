import { Component } from '@angular/core';
import { UserservicesService } from '../userservices.service';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-modaladduser',
  templateUrl: './modaladduser.component.html',
  styleUrl: './modaladduser.component.css'
})
export class ModaladduserComponent {
  name: string ='';
  email: string = '';
  role: string='';
  isSuperAdmin: boolean = false;

  constructor(private userService: UserservicesService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isSuperAdmin = this.authService.isSuperAdmin();
  }
  createUser() {
    this.userService.createUser(this.name, this.email,this.role).subscribe(response => {
      this.router.navigate(['/usermanegement']);
      this.closeModal();
      window.location.reload();
      console.log(response);
    });
  }
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
}
