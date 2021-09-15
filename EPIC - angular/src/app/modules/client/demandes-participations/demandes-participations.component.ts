import { HttpErrorResponse } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Demandes } from 'src/app/Services/Demandes/demandes';
import { DemandesService } from 'src/app/Services/Demandes/demandes.service';
import { Participant } from 'src/app/Services/Participants/participant';
import { ParticipantService } from 'src/app/Services/Participants/participant.service';
import { Tontine } from 'src/app/Services/Tontine/tontine';
import { TontineService } from 'src/app/Services/Tontine/tontine.service';
import { User } from 'src/app/Services/User/user';
import { UserService } from 'src/app/Services/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demandes-participations',
  templateUrl: './demandes-participations.component.html',
  styleUrls: ['./demandes-participations.component.scss']
})
export class DemandesParticipationsComponent implements OnInit {
  DemEmises: boolean;
  DemSoumises: boolean = true;
  modalRef: BsModalRef;

  public user: User;
  public autruser: User;

  public nouvPart = new Participant();
  
  public demandesToutesTontines: Demandes[] = [];
  public demandesSoumises: Demandes[] = [];
  public demandesEmises: Demandes[] = [];
  public demandesEmisesAttente: Demandes[] = [];
  public demandesAttente: Demandes[] = [];
  public historiqueDemandes: Demandes[] = [];
  public selectedDemande: Demandes;

  public moiPart = new Demandes();

  public index: number;
  public type: number;
  
  public code: string;
  public probleme: string;
  public telprobleme: string;
  
  constructor(private modalService: BsModalService,
    private userService: UserService,
    private tontineService: TontineService,
    private demandesService: DemandesService,
    private participantService: ParticipantService) { 
      this.user = JSON.parse(localStorage.getItem("userConnected"));
      moment.locale("fr");
      userService.listen().subscribe((m:any)=>{
        this.getMyDemandes();
      })
      demandesService.listen().subscribe((m:any)=>{
        this.getDemandesFaites();
      })
    }

  ngOnInit(): void {
    this.getMyDemandes();
    this.getDemandesFaites();
  }

  // Toutes les demandes qui sont adressees a mes tontines et que je n'ai pas touche (accepte ou refuse)
  public getMyDemandes(): void{
    this.demandesSoumises.length = 0;
    this.userService.mesTontines(this.user.id).subscribe(
      (response: any) => {
        response.forEach(tontine => {
          if (tontine.demandes.length != 0) {
            tontine.demandes.forEach(demande => {
              this.tontineService.rechercheTontine(demande.tontine).subscribe(
                (response: Tontine) => {
                  demande.tontine = response;
                  demande.dateDemande = moment(demande.dateDemande).format('LLLL');
                  demande.dateAction = moment(demande.dateAction).format('LLLL');
                  this.demandesToutesTontines.push(demande);
                  this.demandesSoumises.push(demande);
                  if (demande.action == false) this.demandesAttente.push(demande);
                  else this.historiqueDemandes.push(demande);
                },
                (error2: HttpErrorResponse) => {
                  console.log(error2.message);
                }
              )
            });
          }
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public getDemandesFaites(): void {
    this.demandesEmises.length = 0;
    this.demandesService.demandesFaites(this.user.email).subscribe(
      (response: Demandes[]) => {
        response.forEach(demande => {
          demande.dateDemande = moment(demande.dateDemande).format('LLLL');
          demande.dateAction = moment(demande.dateAction).format('LLLL');
          this.demandesEmises.push(demande);
          this.demandesToutesTontines.push(demande);
          if (demande.action == false) {
            this.demandesEmisesAttente.push(demande);
          } else {
            this.historiqueDemandes.push(demande);
          }
        })
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }
  
  rejoindreTontine(content: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  historiques(content: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  onTab(number) {
    this.DemEmises = false;
    this.DemSoumises = false;

    if (number == '1') {
      this.DemSoumises = true;
    }
    else if (number == '2') {
      this.DemEmises = true;
    }
  }

  public demandeParticipation(rejoindre: NgForm){
    let already: boolean = false;
    this.moiPart.email = this.user.email;
    this.moiPart.nom_complet = (this.user.prenom+" "+this.user.nom);
    this.moiPart.action = false;
    this.moiPart.acceptation = false;
    this.moiPart.dateAction = null;
    this.moiPart.dateDemande = new Date().toISOString();
    this.probleme = this.moiPart.probleme;
    this.telprobleme = this.moiPart.telprobleme;
    this.tontineService.rechercheTontineByCode(this.code).subscribe(
      (response: Tontine) => {
        if(response.nombrePart > response.participant.length) {
          response.participant.forEach(part => {
            if (part.email == this.user.email) {
              already = true;
            }
          });
          if (already == false) {
            this.moiPart.probleme = this.probleme;
            this.moiPart.telprobleme = this.telprobleme;
            this.moiPart.tontine = response;
            this.moiPart.tontine.proprietaire = null;
            this.moiPart.tontine.participant = null;
            this.moiPart.tontine.demandes = null;
            this.moiPart.tontine.tirages = null;
            this.demandesService.faireDemande(this.moiPart).subscribe(
              (response: Demandes) => {
                Swal.fire(
                  'Demande Envoyée !',
                  'Demande envoyée avec succes !',
                  'success'
                )
                this.demandesToutesTontines.length = 0;
                this.getMyDemandes()
                this.getDemandesFaites();
              },
              (error: HttpErrorResponse) => {
                console.log(error.message);
                Swal.fire(
                  'Erreur !',
                  'Tentative de réeffectuer une demande dans cette tontine !',
                  'error'
                )
              }
            )
          } else {
            Swal.fire(
              'Erreur !',
              'Vous faites déjà partie de cette tontine !',
              'error'
            )
          }
        } else {
          Swal.fire(
            'Erreur !',
            'Cette tontine a atteint le nombre limite de participants !',
            'error'
          )
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire(
          'Erreur !',
          'Veuillez vérifier le code de la tontine.\nAucune tontine trouvée !',
          'error'
        )
      }
    )
    let btn = document.getElementById('fermeture');
    rejoindre.reset();
    this.demandesToutesTontines.length = 0;
    this.getMyDemandes()
    this.getDemandesFaites();
    btn.click();
  }
  
  alertRefus(demande: Demandes) {
    this.selectedDemande = demande;
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: 'Vous allez refuser la demande de participation d\'un utilisateur.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: "rgb(220, 53, 69)",
      confirmButtonText: 'Oui, rejeter !',

    }).then((result) => {
      if (result.value) {
        this.selectedDemande.action = true;
        this.selectedDemande.dateAction = new Date().toISOString()
        this.selectedDemande.dateDemande = moment(demande.dateDemande).toISOString();

        this.selectedDemande.tontine.participant = null;
        this.selectedDemande.tontine.demandes = null;
        this.selectedDemande.tontine.tirages = null;
        this.selectedDemande.tontine.proprietaire = null;
        this.demandesService.modifDemande(this.selectedDemande).subscribe(
          (response: Demandes) => {
            Swal.fire(
            'Demande Rejetée !',
            'Vous avez bien rejeté la demande.',
            'success'
            )
            this.demandesToutesTontines.length = 0;
            this.getMyDemandes()
            this.getDemandesFaites();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        )
        this.demandesToutesTontines.length = 0;
        this.getMyDemandes()
        this.getDemandesFaites();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'La demande n\'a pas été rejeté.',
          'info'
        )
      }
    })
  }

  // La methode la plus longue et confuse (modal de confirmation, puis recuperation des info, recherche
  // de l'utilisateur en question, assignations donnees, ajout participant et ensuite ajout demande...)
  alertAccepter(demande: Demandes) {
    this.selectedDemande = demande;
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: 'Vous allez accepter la demande de participation d\'un utilisateur.',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: "rgb(92, 184, 92)",
      confirmButtonText: 'Oui, accepter !',

    }).then((result) => {
      if (result.value) {
        this.selectedDemande.action = true;
        this.selectedDemande.acceptation = true;
        this.selectedDemande.dateAction = new Date().toISOString()
        this.selectedDemande.dateDemande = moment(demande.dateDemande).toISOString();

        this.selectedDemande.tontine.participant = null;
        this.selectedDemande.tontine.demandes = null;
        this.selectedDemande.tontine.tirages = null;
        this.selectedDemande.tontine.proprietaire = null;

        this.nouvPart.probleme = this.selectedDemande.probleme;
        this.nouvPart.telprobleme = this.selectedDemande.telprobleme;
        this.nouvPart.tontine = this.selectedDemande.tontine;

        this.userService.rechercheUserByEmail(demande.email).subscribe(
          (response: User) => {
            this.autruser = response;
            this.nouvPart.nom = this.autruser.nom;
            this.nouvPart.prenom = this.autruser.prenom;
            this.nouvPart.email = this.autruser.email;
            this.nouvPart.dateNaiss = this.autruser.dateNaiss;
            this.nouvPart.adresse = this.autruser.adresse;
            this.nouvPart.numTel = this.autruser.numTel;
            this.nouvPart.profession = this.autruser.profession;
            this.nouvPart.sexe = this.autruser.sexe;
            this.nouvPart.status_matrimonial = this.autruser.status_matrimonial;
            this.nouvPart.mise_montant = 0;
            this.nouvPart.retard = 0;
            this.nouvPart.tirage = false;
            this.nouvPart.tontine.proprietaire = null;
            this.nouvPart.tontine.participant = null;
            this.nouvPart.tontine.demandes = null;
            this.participantService.ajouterParticipant(this.nouvPart).subscribe(
              (response2: Participant) => {
                this.demandesService.modifDemande(this.selectedDemande).subscribe(
                  (response3: Demandes) => {
                    Swal.fire(
                      'Demande Acceptée !',
                      'Vous avez bien accepté la demande.',
                      'success'
                    )
                    this.demandesToutesTontines.length = 0;
                    this.getMyDemandes()
                    this.getDemandesFaites();
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
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        )
        this.demandesToutesTontines.length = 0;
        this.getMyDemandes()
        this.getDemandesFaites();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'La demande n\'a pas été accepté pour le moment.',
          'info'
        )
      }
    })
  }

  alertAnnuler(demande: Demandes) {
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: 'Vous allez annuler votre demande de participation.',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Non',
      confirmButtonColor: "rgb(220, 53, 69)",
      confirmButtonText: 'Oui, annuler !',

    }).then((result) => {
      if (result.value) {
        this.demandesService.supprimerDemande(demande.id).subscribe(
          (response: void) => {
            Swal.fire(
              'Demande Annulée !',
              'Vous avez bien annulé la demande.',
              'success'
            )
            this.demandesToutesTontines.length = 0;
            this.getMyDemandes()
            this.getDemandesFaites();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        )
        this.demandesToutesTontines.length = 0;
        this.getMyDemandes()
        this.getDemandesFaites();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Avorté',
          'La demande est toujours en attente.',
          'info'
        )
      }
    })
  }
  
  public searchDemandes(key: string): void {
    const results: Demandes[] = [];
    for(const tontine of this.demandesToutesTontines) {
      if (tontine.nom_complet.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || tontine.dateDemande.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(tontine);
      }
    }
    this.demandesToutesTontines = results;
    if (results.length === 0 || !key) {
      this.getMyDemandes();
      this.getDemandesFaites();
    }
  }
}