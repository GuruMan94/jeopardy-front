import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from "./auth/register/register.component";
import {RegisterSuccessComponent} from "./auth/register-success/register-success.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthService} from "./auth/auth.service";


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'register-success', component: RegisterSuccessComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
