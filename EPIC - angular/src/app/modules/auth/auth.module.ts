import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';
// import { ErrorPage2Component } from './error-page2/error-page2.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
  ],
  declarations: [AuthRoutingModule.components, LoginComponent, ForgotPasswordComponent, RegisterComponent, ErrorPageComponent],
  providers: []
})
export class AuthModule { }