import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  administrador={
    username:'',
    password:'',
    name:''
  }
  constructor(private auth:AuthService,
              private router:Router  
            ){
    
  }
  signIn(){
    this.auth.register(this.administrador).subscribe(
      res => {console.log(res)
      this.router.navigate(['/register']);
      },
      err => {console.log(err)}
    )
  }

}
