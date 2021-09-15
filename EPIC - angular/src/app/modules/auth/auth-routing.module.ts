import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';
// import { ErrorPage2Component } from './error-page2/error-page2.component';

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
  // {
  //   path: 'error-500',
  //   component: ErrorPage2Component,
  //   data: { title: 'Error-500' }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    ForgotPasswordComponent
  ];

}