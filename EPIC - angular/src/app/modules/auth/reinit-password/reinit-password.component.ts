import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { User } from 'src/app/Services/User/user';
import { UserService } from 'src/app/Services/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reinit-password',
  templateUrl: './reinit-password.component.html',
  styleUrls: ['./reinit-password.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class ReinitPasswordComponent implements OnInit {
  public email: string;
  public password: string;
  public cpassword: string;
  public conf;

  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    const body = document.getElementsByTagName('body')[0];
    if (sessionStorage.getItem("modeSombre") === null || sessionStorage.getItem("modeSombre") != "") {
      sessionStorage.setItem("modeSombre", "true");
      body.classList.add('dark-mode');
    } else if(sessionStorage.getItem("modeSombre") != null && sessionStorage.getItem("modeSombre") == ""){
      body.classList.remove('dark-mode');
    }

    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  ngOnInit(): void {
  }

  public verif(): boolean{
    if (this.cpassword == this.password) {
      return true;
    } else {
      this.conf = "Ce champ doit être identique au mot de passe !"
      return false;
    }
  }

  public reinitialiser(reinit: NgForm) {
    if (this.verif()) {
      let email = this.email;
      let password = this.password;
      this.userService.rechercheUserByEmail(email).subscribe(
        (response: User) => {
          if (response.confirmationToken != null) {
            this.userService.reinitialiser(email, password).subscribe(
              (response1: User) => {
                Swal.fire(
                  'Enregistré !',
                  `Votre nouveau mot de passe a bien été enregistré !`,
                  'success'
                )
                this.route.navigate(['/connexion']);
              },
              (error: HttpErrorResponse) => {
                console.log(error.message);
                Swal.fire(
                  'Erreur !',
                  'Un problème est survenu\nVeuillez réessayer ultérieurement.',
                  'error'
                )
              }
            )
          } else {
            Swal.fire(
              'Erreur !',
              'Vous n\'êtes pas habilité à modifier le mot de passe de cet utilisateur.',
              'error'
            )
          }
        }
      )
    } else {
      Swal.fire(
        'Erreur !',
        'La confirmation doit être identique au nouveau mot de passe.',
        'error'
      )
    }
    
  }
}