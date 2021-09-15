import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Demandes } from 'src/app/Services/Demandes/demandes';
import { DemandesService } from 'src/app/Services/Demandes/demandes.service';
import { Tontine } from 'src/app/Services/Tontine/tontine';
import { TontineService } from 'src/app/Services/Tontine/tontine.service';
import { User } from 'src/app/Services/User/user';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-tontine-accueil',
  templateUrl: './tontine-accueil.component.html',
  styleUrls: ['./tontine-accueil.component.css']
})
export class TontineAccueilComponent implements OnInit {
  public user = new User;
  public tontines: Tontine[] = [];
  public participationsTontines: Tontine[] = [];
  public demandesSoumises: Demandes[] = [];

  constructor(private route: Router, private userService: UserService,
    private tontineService: TontineService) {
    if (localStorage.getItem("userConnected") === null) {
      this.user = route.getCurrentNavigation().extras.state.data;
      localStorage.setItem("userConnected", JSON.stringify(this.user));
    } else {
      this.user = JSON.parse(localStorage.getItem("userConnected"));
    }
  }

  ngOnInit(): void {
    this.getMyTontines();
    this.getTontines();
  }

  public getMyTontines(): void{
    this.userService.mesTontines(this.user.id).subscribe(
      (response: Tontine[]) => {
        this.tontines = response;
        this.tontines.forEach(tontine => {
          let demandes = tontine.demandes;
          demandes.forEach(demande => {
            this.demandesSoumises.push(demande);
          });
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public getTontines(): void{
    this.tontineService.touteTontines(this.user.id).subscribe(
      (response: Tontine[]) => {
        response.forEach(tontine => {
          let numb = tontine.proprietaire;
          this.userService.rechercheUser(numb).subscribe(
            (response: User) => {
              if (response.id != this.user.id) {
                this.participationsTontines.push(tontine);
              }
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
          )
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }
}
