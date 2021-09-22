import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReinitPasswordComponent } from './reinit-password/reinit-password.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: 'connexion',
    component: LoginComponent,
    data: { title: 'Connexion' }
  },
  {
    path: 'oubli-mot-passe',
    component: ForgotPasswordComponent,
    data: { title: 'Mot-de-passe-oublié' }
  },
  {
    path: 'enregistrer',
    component: RegisterComponent,
    data: { title: 'Enregistrement' }
  },
  {
    path: 'error-404',
    component: ErrorPageComponent,
    data: { title: 'Error-404' }
  },
  {
    path: 'change-mot-de-passe',
    component: ReinitPasswordComponent,
    data: { title: 'change-mot-de-passe' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ErrorPageComponent
  ];

}