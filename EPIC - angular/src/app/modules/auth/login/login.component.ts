import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { User } from 'src/app/Services/User/user';
import { UserService } from 'src/app/Services/User/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class LoginComponent implements OnInit {
  user = new User();
  userConnected = new User();

  constructor(private userService: UserService,
    private route: Router) {
      const body = document.getElementsByTagName('body')[0];
      if (sessionStorage.getItem("modeSombre") === null || sessionStorage.getItem("modeSombre") != "") {
        sessionStorage.setItem("modeSombre", "true");
        body.classList.add('dark-mode');
      } else if(sessionStorage.getItem("modeSombre") != null && sessionStorage.getItem("modeSombre") === ""){
        body.classList.remove('dark-mode');
      }
    }

  ngOnInit(): void {

  }

  public Connexion(formulaire: NgForm) {
    let erreur = document.getElementById('erreur');
    erreur.style.color = "red";
    if (this.user.email != '' && this.user.password != '') {
      this.userService.connexion(this.user).subscribe(
        (response: User) => {
          console.log(response.prenom+" Connecté !");
          this.route.navigate(['/gt-accueil'], {state: {data: response}});
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          erreur.innerHTML = 'Email ou mot de passe non valide !';
          formulaire.reset();
        }
      )
    } else {
      erreur.innerHTML = 'Veuillez renseigner les champs du formulaire svp !'
    }
  }
}