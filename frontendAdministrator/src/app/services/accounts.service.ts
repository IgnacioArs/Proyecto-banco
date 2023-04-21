import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AccountsService {

  private URL = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getAccounts(){
    return this.http.get<any>(this.URL+'/accounts');
  }

  getPrivateAccounts(){
    return this.http.get<any>(this.URL+'/private-accounts');
  }

  getAccountId(id:string){
    return this.http.get<any>(this.URL+'/private-accounts/'+id);
  }

  updateAccount(id:string,account:object){
    return this.http.patch<object>(this.URL+'/private-accounts-update/'+id,account);
  }
}
