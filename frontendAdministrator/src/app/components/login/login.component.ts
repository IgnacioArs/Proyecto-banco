import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  administrador={
    username:'',
    password:'',
  }



constructor(private auth:AuthService,
            private router:Router,
           ){}
 

signUp(){
    this.auth.login(this.administrador).subscribe(
      res=>{
        console.log(res)
        var token:any =res
        localStorage.setItem('token',token.token);
        this.router.navigate(['/private-accounts']);
      },
      err => {console.log(err)}
    )

  }
}
