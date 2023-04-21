import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
//llamamos al interceptor aqui
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth:AuthService) { }
    //aqui esta el interceptor
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenizeReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.auth.getToken()}`
          }
        })
        return next.handle(tokenizeReq)
      }
  
      return next.handle(req)
    }
  }
