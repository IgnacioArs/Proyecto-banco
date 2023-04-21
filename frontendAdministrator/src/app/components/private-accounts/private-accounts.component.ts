import { Component } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Alert from 'sweetalert2'
import { isEmpty, map } from 'rxjs';

@Component({
  selector: 'app-private-accounts',
  templateUrl: './private-accounts.component.html',
  styleUrls: ['./private-accounts.component.css']
})
export class PrivateAccountsComponent {
  
  updateAccount = {
    codeCity: "",
    codeCountry:"",
    codeCounty:"",
    codeRegion:"",
    description:"",
    id:0,
    postalCode:"",
    priority:0
  }

  anyScreen:boolean =false;
  idEdit:any;
  idParams:any;
  accountId:any=[];
  idUpdate:any = this.accountId.id;

  formState:boolean=false;
  //payloadData
  accounts:any =[];
  constructor(private Accounts:AccountsService,
              private accountService:AccountsService,
              private router:Router
              ){}

  ngOnInit(): void {
    this.Accounts.getPrivateAccounts()
    .subscribe(
      res =>{
        this.accounts = res.data},
      error => {console.log(error)}
    )  
  }
  

params(id:string){
  console.log("obteniendo el id",id);
  this.Accounts.getAccountId(id)
  .subscribe(
    res =>{
            if(res){
                this.formState=true
                this.anyScreen=true
                res.data
                console.log(res.data)
                this.idEdit = res.data.id
                this.onSearchChange(res.data.id)
              
            }
          },
    error => {console.log(error)}
  )  
}

editAccount():any{
  
try {
    if(Object.keys(this.updateAccount.codeCity).length === 0 ||  Object.keys(this.updateAccount.codeCountry).length === 0 || Object.keys(this.updateAccount.codeCounty).length === 0  || Object.keys(this.updateAccount.codeRegion).length === 0 || Object.keys(this.updateAccount.description).length === 0 || Object.keys(this.updateAccount.postalCode).length === 0){
      this.AlertError();
    }else{
      this.AlertOk();
      /* console.log("EDITANDOOO!",this.updateAccount); */
      this.formState =false;
      /* console.log("viendo el id recibiendo",this.idEdit); */
      var idParse:string = this.idEdit;
      var newAccount:any= {
      codeCity:this.updateAccount.codeCity,
      codeCountry:this.updateAccount.codeCountry,
      codeCounty:this.updateAccount.codeCounty,
      codeRegion:this.updateAccount.codeRegion,
      description:this.updateAccount.description,
      id:idParse,
      postalCode:this.updateAccount.postalCode,
      priority:this.updateAccount.priority
    }
   /*  console.log("viendo el id",newAccount.id); */
    this.AlertOk();
    this.Accounts.updateAccount(newAccount.id,newAccount).subscribe();
    window.location.reload();
    }
    
} catch (error) {
    this.AlertError()
}

}

onSearchChange(searchValue: string): void {  
  console.log(searchValue);
}

AlertOk():any{
  return Alert.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Cuenta actualizada correctamente!',
    showConfirmButton: false,
    timer: 1500
  })
}

AlertError():any{
  return Alert.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Hay campos vacios!',
    footer: '<a href="">Verifique los campos vacios</a>'
  })
}

}


