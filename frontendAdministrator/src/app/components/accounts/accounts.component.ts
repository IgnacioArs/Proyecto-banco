import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

 accounts:any =[];
  constructor(private Accounts:AccountsService){}

  ngOnInit(): void {
    this.Accounts.getAccounts()
    .subscribe(
      res =>{
        console.log(res)
        this.accounts = res},
      error => {console.log(error)}
    )  
  }
  
}
