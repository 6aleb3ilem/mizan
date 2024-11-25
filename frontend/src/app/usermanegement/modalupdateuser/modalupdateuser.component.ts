import { Component, OnInit } from '@angular/core';
import { UserservicesService } from '../userservices.service';
import { Router } from '@angular/router';
import { Usermanegement } from '../usermanegement';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-modalupdateuser',
  templateUrl: './modalupdateuser.component.html',
  styleUrls: ['./modalupdateuser.component.css']
})
export class ModalupdateuserComponent implements OnInit {
  name: string = '';
  email: string = '';
  role: string = '';
  id: number | null = null;
  isSuperAdmin: boolean = false;

  constructor(private userService: UserservicesService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.selectedUsermanegement$.subscribe(user => {
      if (user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
      }
    });
    this.isSuperAdmin = this.authService.isSuperAdmin();

  }

  updateUser() {
    if (this.id !== null) {
      this.userService.updateUser(this.id, this.name, this.email, this.role).subscribe(response => {
        this.router.navigate(['/usermanegement']);
        this.closeModalUpdate();
        window.location.reload();
        console.log(response);
      });
    }
  }

  closeModalUpdate() {
    const modalBackgroundUpdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundUpdate) {
      modalBackgroundUpdate.style.display = 'none';
    }
  }
}
