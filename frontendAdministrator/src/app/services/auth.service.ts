import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL =environment.apiUrl
  constructor(private http:HttpClient,
              private router:Router
              ) { }

  register(administrator:object){
  return this.http.post<object>(this.URL+'/register',administrator)
  }

  login(administrator:object){
    return this.http.post<object>(this.URL+'/login',administrator)
  }

  isLogged(){
    return !! localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
   return this.router.navigate(['/login']);
  }
}
