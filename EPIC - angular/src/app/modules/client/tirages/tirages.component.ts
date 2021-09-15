import { HttpErrorResponse } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Participant } from 'src/app/Services/Participants/participant';
import { ParticipantService } from 'src/app/Services/Participants/participant.service';
import { Tirages } from 'src/app/Services/Tirages/tirages';
import { TiragesService } from 'src/app/Services/Tirages/tirages.service';
import { Tontine } from 'src/app/Services/Tontine/tontine';
import { TontineService } from 'src/app/Services/Tontine/tontine.service';
import { User } from 'src/app/Services/User/user';
import { UserService } from 'src/app/Services/User/user.service';
import { Versement } from 'src/app/Services/Versements/versement';
import { VersementService } from 'src/app/Services/Versements/versement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tirages',
  templateUrl: './tirages.component.html',
  styleUrls: ['./tirages.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 400, noPause: true, showIndicators: false } }
  ]
})
export class TiragesComponent implements OnInit {
  user: User;
  public autruiUser: User;
  isDisabled: boolean = false;
  isTired: boolean = false;

  public hidden: boolean = true;
  
  public ordre: string;

  public toutesTontines: Tontine[] = [];
  public tontines: Tontine[] = [];
  public tontinesParticipations: Tontine[] = [];
  public tontineSelect: Tontine;

  public participantsTontine: Participant[] = [];
  public participantChoix: Participant;

  public tirages: Tirages[];
  public tirage = new Tirages();
  
  MesTontines: boolean = true;
  MesParticipations: boolean;
  modalRef: BsModalRef;
  modalRefChild: BsModalRef;

  constructor(private modalService: BsModalService,
    private userService: UserService,
    private tontineService: TontineService,
    private participantService: ParticipantService,
    private tirageService: TiragesService,
    private versementService: VersementService) {
      this.user = JSON.parse(localStorage.getItem("userConnected"));
      moment.locale("fr");
    }

  ngOnInit(): void {
    this.getMyTontines();
    this.getTontines();
    this.tontinesToutes();
  }

  // Tontines dont je fais parti
  public tontinesToutes(): void{
    this.tontineService.touteTontines(this.user.id).subscribe(
      (response: Tontine[]) => {
        this.toutesTontines = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  // Tontines que j'ai cree et dont nous sommes le jour du tirage
  public getMyTontines(): void{
    this.tontines.length = 0;
    this.userService.mesTontines(this.user.id).subscribe(
      (response: Tontine[]) => {
        response.forEach(tontine => {
          this.datesConf(tontine, this.tontines);
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  // Tontines dont je suis participant et dont nous sommes le jour du tirage
  public getTontines(): void{
    this.tontinesParticipations.length = 0;
    this.tontineService.touteTontines(this.user.id).subscribe(
      (response: any) => {
        response.forEach(tontine => {
          let numb = tontine.proprietaire;
          this.userService.rechercheUser(numb).subscribe(
            (response: User) => {
              this.autruiUser = response;
              if (this.autruiUser.id != this.user.id) {
                tontine.proprietaire = this.autruiUser;
                this.datesConf(tontine, this.tontinesParticipations);
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

  // Pour cacher le bouton de tirage si celui qui devait se faire a deja ete effectue
  // public isDisabledMines(tontine: Tontine): boolean {
  //   if(tontine.tirages.length != 0) {
  //     tontine.tirages.forEach(tirage => {
  //       let dateTir = moment(tirage.dateTirage).endOf('day');
  //       let today = moment().endOf('day');
  //       if (dateTir.isSame(today)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   } else {
  //     return false;
  //   }
  // }

  // Pour savoir si oui ou non le tirage a ete effctue dans une autre tontine
  // public isShown(tontine: Tontine): boolean {
  //   if(tontine.tirages.length != 0) {
  //     tontine.tirages.forEach(tirage => {
  //       if (moment(tirage.dateTirage).endOf('day').isSame(moment().endOf('day'))) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   } else {
  //     return false;
  //   }
  // }

  // Date des tirages de chaque tontine
  public datesConf(tontine: Tontine, tontines: Tontine[]){
    let debut = moment(tontine.dateDebut, "YYYY/MM/DD");
    let fin = moment(tontine.dateFin, "YYYY/MM/DD");
    let tirage = tontine.tirage;
    let cicle = tontine.periodicite;
    if (tontine.nombrePart == tontine.participant.length) {
      if (tirage == "Jours") {
        while (debut.isBefore(fin)) {
          if (moment().endOf('day').isSame(debut.endOf('day'))) {
            tontines.push(tontine);
          } 
          debut.add(cicle, 'days');
        }
      }
      if (tirage == "Semaines") {
        while (debut.isBefore(fin)) {
          if (moment().endOf('day').isSame(debut.endOf('day'))) {
            tontines.push(tontine);
          }
          debut.add(cicle, 'weeks');
        }
      }
      if (tirage == "Mois") {
        while (debut.isBefore(fin)) {
          if (moment().endOf('day').isSame(debut.endOf('day'))) {
            tontines.push(tontine);
          }
          debut.add(cicle, 'months');
        }
      }
    }
  }

  onTab(number) {
    this.MesTontines = false;
    this.MesParticipations = false;

    if (number == '1') {
      this.MesTontines = true;
    }
    else if (number == '2') {
      this.MesParticipations = true;
    }
  }

  // Modal pour le tirage des tontines
  tirageTontine(content: TemplateRef<any>, tontine: Tontine) {
    if(tontine.tirages.length != 0) {
      tontine.tirages.forEach(tirage => {
        let dateTir = moment(tirage.dateTirage).endOf('day');
        let today = moment().endOf('day');
        if (dateTir.isSame(today)) {
          Swal.fire(
            'Tirage déjà effectué !',
            'Vous avez déjà effectué le tirage d\'ajourd\'hui.',
            'error'
          )
        } else {
          this.participantsTontine.length = 0;
          this.tontineSelect = tontine;
          tontine.participant.forEach(participant => {
            if (participant.tirage == false) {
              this.participantsTontine.push(participant);
            }
          });

          if (tontine.typeTirage == "OrdreArrivee") {
            this.ActualisationTirage(this.participantsTontine, tontine);
          }

          this.modalRef = this.modalService.show(
            content,
            Object.assign({}, { class: 'gray modal-lg' })
          );
        }
      });
    } else {
      this.participantsTontine.length = 0;
      this.tontineSelect = tontine;
      tontine.participant.forEach(participant => {
        if (participant.tirage == false) {
          this.participantsTontine.push(participant);
        }
      });

      if (tontine.typeTirage == "OrdreArrivee") {
        this.ActualisationTirage(this.participantsTontine, tontine);
      }

      this.modalRef = this.modalService.show(
        content,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }
  }

  // Traitement tirage au sort
  public async tirageAleatiore(){
    this.participantsTontine.sort(()=> Math.random() - 0.5);
    this.hidden = false;
    await new Promise(r => setTimeout(r, 10000));
    this.ActualisationTirage(this.participantsTontine, this.tontineSelect);
  }

  // Traitement tirage au choix
  public choixFait(){
    let parts: Participant[] = [];
    parts.push(this.participantChoix);
    this.ActualisationTirage(parts, this.tontineSelect);
  }

  // Actualiser la tontine, les participants ainsi que l'historique des tirages
  // NB: Dans la prochaine version faire de telle sorte que lorsque retard = 3 d'un des participants on l'exclu de la tontine
  public ActualisationTirage(participants: Participant[], tontine: Tontine) {

    let participantSelect: Participant;
    // ==================== Actualisation =========================== //
    participantSelect = participants[0];
  
    // Le champ tirage est mis a true, ce participant va retirer
    participantSelect.tirage = true;
    // Enlever la tontine du participant pour effectuer la modification
    participantSelect.tontine = null;
    // On enleve la date de versement pour un depart a zero
    participantSelect.date_versement = null;
    // On recupere le montant que ce participant avait verse
    let montant;
    // Verifions si le participant avait soumis le montant requis
    if (participantSelect.mise_montant >= tontine.montant) {
      montant = tontine.montant;
      participantSelect.mise_montant = participantSelect.mise_montant - tontine.montant;
    } else {
      montant = participantSelect.mise_montant;
      participantSelect.mise_montant = participantSelect.mise_montant - tontine.montant;
      participantSelect.retard += 1;
    }
    // En ce moment on modifie le participant (actualise)
    this.participantService.modifierParticipant(participantSelect).subscribe(
      (response: Participant) => {
        // On enleve les champs qui poseraient probleme
        tontine.proprietaire = null;
        tontine.participant = null;
        tontine.demandes = null;
        tontine.tirages = null;
        // Ensuite on attribut au participant la tontine enlevee
        this.participantService.mettreTontine(tontine, participantSelect.id).subscribe(
          (response0: Participant) => {
            // Nous devons la recuperer les versements du participant et tous les supprimer
            this.versementService.tousVersements(response0.id).subscribe(
              (response1: Versement[]) => {
                response1.forEach(vers => {
                  this.versementService.suppprimerVersement(vers.id).subscribe(
                    (response2: void) => {
                      console.log("Versement supprimé !");
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
            // La nous allons passer a la partie ou l'on check pour tous les partcipants,
            //  on actualise et on ajoute un instance de tirage pour l'historique
            this.tirage.emailRetire = response0.email;
            this.tirage.nomRetire = participantSelect.prenom+" "+participantSelect.nom;
            this.tirage.tontine = tontine;
            this.tirage.dateTirage = moment().toISOString();
            // Je recupere tous les partcipants de la tontine pour pouvoir les actualiser et avoir le montant final
            this.tontineService.rechercheTontine(tontine.id).subscribe(
              (response1: Tontine) => {
                tontine = response1;
                // Je recupere maintenant tous les partcipants autres que celui qui a retire
                let particips: Participant[] = [];
                tontine.participant.forEach(part => {
                  if (part.email != participantSelect.email) {
                    particips.push(part);
                  }
                })
                particips.forEach(part => {
                  // Changement des informations
                  part.tontine = null;
                  part.date_versement = null;
                  if (part.mise_montant >= tontine.montant) {
                    montant += tontine.montant;
                    part.mise_montant = part.mise_montant - tontine.montant;
                  } else {
                    montant += part.mise_montant; 
                    part.mise_montant = part.mise_montant - tontine.montant;
                    part.retard += 1;
                  }
                  // Actualisation du participant
                  this.participantService.modifierParticipant(part).subscribe(
                    (response2: Participant) => {
                      // On enleve les champs qui poseraient probleme
                      tontine.proprietaire = null;
                      tontine.participant = null;
                      tontine.demandes = null;
                      tontine.tirages = null;
                      // Ensuite on attribut au participant la tontine enlevee
                      this.participantService.mettreTontine(tontine, part.id).subscribe(
                        (response3: Participant) => {
                          // Nous devons la recuperer les versements du participant et tous les supprimer
                          this.versementService.tousVersements(response3.id).subscribe(
                            (response4: Versement[]) => {
                              response4.forEach(vers => {
                                this.versementService.suppprimerVersement(vers.id).subscribe(
                                  (response5: void) => {
                                    console.log("Versement supprime !");
                                  },
                                  (error: HttpErrorResponse) => {
                                    console.log(error.message);
                                  }
                                )
                              });
                              tontine = response1;
                              this.getMyTontines();
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
                });
                this.tirage.montant = montant;
                this.tirageService.enregistrerTirage(this.tirage).subscribe(
                  (responseFinal: Tirages) => {
                    this.ordre = responseFinal.nomRetire;
                    if (tontine.typeTirage == "Aleatoire") {
                      this.hidden = true;
                      let tire = document.getElementById('sorti');
                      tire.innerHTML = responseFinal.nomRetire;
                      this.isDisabled = true;
                    }
                    if (tontine.typeTirage == "Choix") {
                      let tire = document.getElementById('choix');
                      tire.innerHTML = responseFinal.nomRetire;
                    }
                    Swal.fire(
                      'Tirage terminé !',
                      'Vous venez d\'effectuer un tirage avec succes.',
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
  }
  
  historiqueTirage(content: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  detailsHist(content: TemplateRef<any>, tontine: Tontine) {
    this.tirages = tontine.tirages;
    this.modalRefChild = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // A titre d'essai, a supprimer ulterieurement
  // createRange(number){
  //   return new Array(number);
  // }
}