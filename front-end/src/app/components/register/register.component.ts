import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent {

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) { }

  register(username: string, email: string, age: number, password: string): void {
    const user = { username, email, age, password  };
    this.authService.register(user).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Успешная регистрация');
        this.authService.login(user);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        if (error && error.error && error.error.message) {
          this.toastr.error(error.error.message, 'Ошибка при регистрации');
        } else {
          this.toastr.error('Что-то пошло не так', 'Ошибка при регистрации');
        }
        console.error('Ошибка при регистрации:', error);
      }
    });
    
  }

}
