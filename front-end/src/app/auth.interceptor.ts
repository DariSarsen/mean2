import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');

    if (token && expiration) {
      const tokenExpiration = new Date(expiration);
      if (tokenExpiration <= new Date()) {
        this.authService.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        this.router.navigate(['/login']); 
      }
    }

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Пропуск запроса через цепочку интерсепторов и выполнение запроса
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          // Обработка успешного ответа
          if (event instanceof HttpResponse) {
            // Дополнительная логика при необходимости
          }
        }
      )
    );
  }
}
