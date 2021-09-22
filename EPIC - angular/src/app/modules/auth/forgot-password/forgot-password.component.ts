import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;

  constructor(private userService: UserService) {
    const body = document.getElementsByTagName('body')[0];
    if (sessionStorage.getItem("modeSombre") === null || sessionStorage.getItem("modeSombre") != "") {
      sessionStorage.setItem("modeSombre", "true");
      body.classList.add('dark-mode');
    } else if(sessionStorage.getItem("modeSombre") != null && sessionStorage.getItem("modeSombre") == ""){
      body.classList.remove('dark-mode');
    }
  }

  ngOnInit(): void {
  }

  public reinitialiser(reinit: NgForm) {
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: 'Vous allez réinitialiser votre mot de passe !',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: "rgb(220, 53, 69)",
      confirmButtonText: 'Réinitialiser !',

    }).then((result) => {
      if (result.value) {
        let email = this.email;
        this.userService.oubliPassword(email).subscribe(
          (response: void) => {
            Swal.fire(
              'Vérifiez votre boîte mail !',
              `Un email a été envoyé à cette adresse pour confirmer votre identité !`,
              'success'
            )
            reinit.reset();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
            Swal.fire(
              'Erreur !',
              'Aucun compte avec cet email.',
              'error'
            )
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'La demande de réinitialisation n\'a pas eu lieu.',
          'error'
        )
      }
    })
  }
}