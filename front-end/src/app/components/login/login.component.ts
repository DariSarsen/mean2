import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) { }

  login(email: string, password: string): void {
    const credentials = { email, password };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.toastr.success('Аутентификация успешна!', 'Успех');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.toastr.error(error.error.message, 'Ошибка при аутентификации');
        } else {
          this.toastr.error(error.error.message, 'Ошибка при аутентификации');
        }
        console.error('Ошибка при аутентификации:', error);
      }
      
    });
  }

}
