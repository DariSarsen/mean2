import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated: boolean = false;
  user: any;

  constructor(public authService: AuthService, private router: Router, private toastr: ToastrService) { }

  logout(): void {
    this.authService.logout();
    this.toastr.success('Вы вышли из аккаунта!', '');
    this.router.navigate(['/login']);
  }
}
