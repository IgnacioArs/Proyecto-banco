import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//AQUI IMPORTAMOS LOS COMPONENTES
import {AccountsComponent} from './components/accounts/accounts.component'
import {PrivateAccountsComponent} from './components/private-accounts/private-accounts.component'
import {RegistroComponent} from './components/registro/registro.component'
import {LoginComponent} from './components/login/login.component'
//IMPORTAMOS EL GUARD LA CUAL NOS AYUDARA PARA BLOQUEAR LAS RUTAS 
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  {
    path:'',
    redirectTo:'/accounts',
    pathMatch:'full'
  },
  {
    path:'accounts',
    component:AccountsComponent
  },
  {
    path:'private-accounts',
    component:PrivateAccountsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'register',
    component:RegistroComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
