import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Services/User/user';
import { UserService } from 'src/app/Services/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User;
  userMod: any;

  password;
  npassword;
  cpassword;
  conf;

  Profil: boolean = true;
  Changepassword: boolean;
  constructor(private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem("userConnected"));
  }

  onTab(number) {
    this.Profil = false;
    this.Changepassword = false;

    if (number == '1') {
      this.Profil = true;
    }
    else if (number == '2') {
      this.Changepassword = true;
    }
  }

  ngOnInit(): void {
  }

  public Actualiser(formulaire: NgForm): void {
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: 'Voulez-vous vraiment changer vos informations ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: "rgb(220, 53, 69)",
      confirmButtonText: 'Sauvegarder !',

    }).then((result) => {
      if (result.value) {
        this.userMod = this.user;
        this.userMod.tontine.length = 0;
        this.userService.rechercheUser(this.user.id).subscribe(
          (response: User) => {
            response.tontine.forEach(tont => {
              tont.proprietaire = null
              tont.participant = null
              this.userMod.tontine.push(tont);
            })
            this.userMod.signals = response.signals;
            this.userMod.vols = response.vols;
            this.userMod.impayes = response.impayes;
            this.userService.modifier(this.userMod).subscribe(
              (response: User) => {
                this.user = response;
                localStorage.clear();
                localStorage.setItem("userConnected", JSON.stringify(this.user));
                Swal.fire(
                  'Modification effectuée !',
                  'Votre profil a été actualisé avec succes.',
                  'success'
                )
              },
              (error: HttpErrorResponse) => {
                console.log(error.message);
              }
            )
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Aucune modification prise en compte.',
          'info'
        )
      }
    })
  }

  public confirm(): boolean{
    if (this.npassword == this.cpassword) {
      return true;
    } else {
      this.conf = "Ce champ doit être identique au nouveau mot de passe !"
      return false;
    }
  }

  public verif(): boolean{
    if (this.password == this.user.password) {
      return true;
    } else {
      return false;
    }
  }

  public Modifier(formulaire: NgForm): void{
    if (this.verif() && this.confirm()) {
      Swal.fire({
        title: 'Êtes vous sûr ?',
        text: 'Voulez-vous vraiment changer de mot de passe ?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Annuler',
        confirmButtonColor: "rgb(220, 53, 69)",
        confirmButtonText: 'Sauvegarder !',
  
      }).then((result) => {
        if (result.value) {
          let newPass = this.npassword;
          this.userService.rechercheUser(this.user.id).subscribe(
            (response: User) => {
              this.userMod = response;
              this.userMod.password = newPass;
              this.userMod.tontine.length = 0;
              response.tontine.forEach(tont => {
                this.userMod.tontine.push(tont.id);
              })
              this.userService.modifier(this.userMod).subscribe(
                (response: User) => {
                  this.user = response;
                  localStorage.clear();
                  localStorage.setItem("userConnected", JSON.stringify(this.user));
                  Swal.fire(
                    'Modification effectuée !',
                    'Mot de passe modifié a été faite avec succes.',
                    'success'
                  )
                },
                (error: HttpErrorResponse) => {
                  console.log(error.message);
                }
              )
            }
          ),
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé !',
            'Mot de passe inchangé.',
            'info'
          )
        }
      })
    } else {
      Swal.fire(
        'Erreur !',
        'Verifier les champs du formulaire svp.',
        'error'
      )
    }
  }
}
