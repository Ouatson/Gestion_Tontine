import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { User } from 'src/app/Services/User/user';
import { UserService } from 'src/app/Services/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class RegisterComponent implements OnInit {
  user = new User();
  cpassword;
  conf;

  constructor(private route: Router,
    private userService: UserService) {
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

  verif(): boolean{
    if (this.cpassword == this.user.password) {
      return true;
    } else {
      this.conf = "Ce champ doit être identique au mot de passe !"
      return false;
    }
  }

  public Enregistrer(rformulaire: NgForm){
    if(this.user.sexe != null && this.user.status_matrimonial != null) {
      if (this.verif()) {
        this.userService.enregistrer(this.user).subscribe(
          (response: User) => {
            Swal.fire(
              'Bien enregistré !',
              'Nouvel utilisateur créé !',
              'success'
            )
            console.log(Object.values(response));
            this.route.navigate(['/connexion']);
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
            let erreur = document.getElementById('erreur');
            erreur.style.color = 'red';
            erreur.innerHTML = 'Cet email possède déjà un compte !'
            rformulaire.reset();
          }
        )
      }
    } else {
      Swal.fire(
        'Incomplet !',
        'Renseignez tous les champs svp !',
        'error'
      )
    }
  }

}
