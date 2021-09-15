import { HttpErrorResponse } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Participant } from 'src/app/Services/Participants/participant';
import { ParticipantService } from 'src/app/Services/Participants/participant.service';
import { Tontine } from 'src/app/Services/Tontine/tontine';
import { TontineService } from 'src/app/Services/Tontine/tontine.service';
import { User } from 'src/app/Services/User/user';
import { Versement } from 'src/app/Services/Versements/versement';
import { VersementService } from 'src/app/Services/Versements/versement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-versement',
  templateUrl: './versement.component.html',
  styleUrls: ['./versement.component.scss']
})
export class VersementComponent implements OnInit {
  user: User;

  public versement = new Versement();
  public versements: Versement[] = [];

  public tontines: Tontine[] = [];
  public tontineSelect: Tontine;

  public participantsTontine: Participant[];
  public participantSelect: Participant;

  EmpAllTab: boolean = true;
  modalRef: BsModalRef;
  modalRefChild: BsModalRef;

  constructor(private modalService: BsModalService,
    private participantService: ParticipantService,
    private tontineService: TontineService,
    private versementService: VersementService) { 
      this.user = JSON.parse(localStorage.getItem("userConnected"));
      moment.locale("fr");
      tontineService.listen().subscribe((m:any)=>{
        this.getTontines();
      })
    }

  ngOnInit(): void {
    this.getTontines();
    this.versement.operateur = "";
  }

  // Tontines dont je suis participant
  public getTontines(): void{
    this.tontineService.touteTontines(this.user.id).subscribe(
      (response: Tontine[]) => {
        this.tontines = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  partTontine(content: TemplateRef<any>, tontine: Tontine) {
    this.tontineSelect = tontine;
    this.participantsTontine = tontine.participant;
    this.participantsTontine.forEach(part => {
      if (part.date_versement!=null) {
        part.date_versement = moment(part.date_versement).format('LLLL');
      }
    });
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  virement(content: TemplateRef<any>, participant: Participant) {
    this.participantSelect = participant;
    this.modalRefChild = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  historique(content: TemplateRef<any>, participant: Participant) {
    this.participantSelect = participant;
    this.versements.length = 0;
    this.versementService.tousVersements(this.participantSelect.id).subscribe(
      (response: Versement[]) => {
        response.forEach(vers => {
          vers.date = moment(vers.date).format('LLLL');
          this.versements.push(vers);
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
    this.modalRefChild = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // Ajout d'un versement, PS n'oublie pas le sweetalert pour le non succes
  public ajouterVirement(ajouterSomme: NgForm){
    let montant = this.versement.montant;
    let operateur = this.versement.operateur;
    this.versement.participant = this.participantSelect;
    this.versement.date = moment().toISOString();
    let btn = document.getElementById("fermVirement");
    if (this.participantSelect.mise_montant != null) {
      this.participantSelect.mise_montant += this.versement.montant;
    } else {
      this.participantSelect.mise_montant = this.versement.montant;
    }
    if (this.participantSelect.mise_montant > (this.tontineSelect.montant*this.tontineSelect.nombrePart)) {
      Swal.fire(
        'Alerte !',
        'Le montant que vous essayez de transferer dépasse votre mise totale requise .\nReprenez svp !',
        'info'
      )
      btn.click();
    } else {
      this.participantSelect.date_versement = this.versement.date;
      this.tontineService.rechercheTontine(this.participantSelect.tontine).subscribe(
        (response: Tontine) => {
          this.participantSelect.tontine = null;
          response.proprietaire = null;
          response.participant = null;
          response.demandes = null;
          response.tirages = null;
          this.participantService.modifierParticipant(this.participantSelect).subscribe(
            (response1: Participant) => {
              this.participantService.mettreTontine(response, this.participantSelect.id).subscribe(
                (response2: Participant) => {
                  this.versement.montant = montant;
                  this.versement.operateur = operateur;
                  this.versementService.ajoutVersement(this.versement).subscribe(
                    (response3: Versement) => {
                      this.versement = new Versement();
                      Swal.fire(
                        'Versement enregistré !',
                        'Le versement a été enregistré avec succes !',
                        'success'
                      )
                    },
                    (error: HttpErrorResponse) => {
                      console.log(error.message);
                      Swal.fire(
                        'Erreur !',
                        'Veuillez réessayer svp !',
                        'error'
                      )
                    }
                  )
                }
              )
              this.getTontines();
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
      ajouterSomme.reset();
      btn.click();
      this.getTontines();
    }
  }

  suppress(versement: Versement) {
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: 'Ce versement sera révoqué !',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: "rgb(220, 53, 69",
      confirmButtonText: 'Oui, supprimer !',
      
    }).then((result) => {
      if (result.value) {
        this.participantSelect.mise_montant -= versement.montant;
        this.versementService.suppprimerVersement(versement.id).subscribe(
          (response: void) => {
            this.tontineService.rechercheTontine(this.participantSelect.tontine).subscribe(
              (response1: Tontine) => {
                this.participantSelect.tontine = null;
                response1.proprietaire = null;
                response1.participant = null;
                response1.demandes = null;
                response1.tirages = null;
                this.participantService.modifierParticipant(this.participantSelect).subscribe(
                  (response2: Participant) => {
                    this.participantService.mettreTontine(response1, this.participantSelect.id).subscribe(
                      (response3: Participant) => {
                        Swal.fire(
                          'Versement révoqué !',
                          'Le versement a été révoqué avec succes !',
                          'success'
                        )
                        this.getTontines();
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
            Swal.fire(
              'Erreur !',
              'Veuillez réessayer svp !',
              'error'
            )
          }
        )
        this.getTontines();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'La suppression n\'a pas eu lieu.',
          'info'
        )
      }
    })
  }
  
  public searchTontines(key: string): void {
    const results: Tontine[] = [];
    for(const tontine of this.tontines) {
      if (tontine.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || tontine.code.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(tontine);
      }
    }
    this.tontines = results;
    if (results.length === 0 || !key) {
      this.getTontines();
    }
  }
}
