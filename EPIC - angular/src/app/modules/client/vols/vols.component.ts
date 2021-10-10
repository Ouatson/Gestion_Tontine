import { HttpErrorResponse } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Participant } from 'src/app/Services/Participants/participant';
import { ParticipantService } from 'src/app/Services/Participants/participant.service';
import { Vols } from 'src/app/Services/Problemes/Vols/vols';
import { VolsService } from 'src/app/Services/Problemes/Vols/vols.service';
import { Tontine } from 'src/app/Services/Tontine/tontine';
import { TontineService } from 'src/app/Services/Tontine/tontine.service';
import { User } from 'src/app/Services/User/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vols',
  templateUrl: './vols.component.html',
  styleUrls: ['./vols.component.css']
})
export class VolsComponent implements OnInit {
  user: User;
  EmpAllTab: boolean = true;
  modalRef: BsModalRef;

  public listVols: Vols[] = [];
  public vol = new Vols();
  public volSelected: Vols;
  
  public tontines: Tontine[] = [];
  public tontineSelect: Tontine;

  public participantsTontine: Participant[] = [];
  public selectedParticipants: number[] = new Array<number>();
  public concern: number[] = new Array<number>();

  constructor(private modalService: BsModalService,
    private tontineService: TontineService,
    private volsService: VolsService,
    private participantService: ParticipantService) {
      this.user = JSON.parse(localStorage.getItem("userConnected"));
      moment.locale("fr");
      volsService.listen().subscribe((m:any)=>{
        this.getDepositions();
      })
    }

  ngOnInit(): void {
    this.getDepositions();
    this.getTontines();
  }

  // Methode pour recuperer les depositions concernant les vols
  public getDepositions() {
    this.volsService.listerVol(this.user.id).subscribe(
      (response: Vols[]) => {
        response.forEach(vol => {
          if (vol.concernes.length != 0) {
            vol.concernes.forEach(part => {
              this.participantService.rechercherParticipant(part).subscribe(
                (response1: Participant) => {
                  vol.concernes.push(response1);
                },
                (error: HttpErrorResponse) => {
                  console.log(error.message);
                }
              )
            });
          }
        });
        this.listVols = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  // Tontines dont je fais parti
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

  ajoutModal(content: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  modifDeposition(content: TemplateRef<any>, vol: Vols) {
    this.volSelected = vol;
    this.selectedParticipants.length = 0;
    if (vol.concernes.length != 0) {
      vol.concernes.forEach(concern => {
        this.selectedParticipants.push(concern.id);
      });
    }
    
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  // Methode pour la soumission de la deposition de vol
  public soumission(vol: NgForm){
    this.vol.owner = this.user;
    this.vol.owner.tontine = null;
    this.vol.owner.signals = null;
    this.vol.owner.vols = null;
    this.vol.owner.impayes = null;
    this.vol.concernes = [];
    let tontineId = this.vol.tontineId;
    let lieu = this.vol.lieu;
    let date = this.vol.date;
    let descript = this.vol.description;
    let parts = this.selectedParticipants;
    this.tontineService.rechercheTontine(tontineId).subscribe(
      async (response: Tontine) => {
        if (parts.length != 0) {
          parts.forEach(id => {
            this.participantService.rechercherParticipant(id).subscribe(
              (response1: Participant) => {
                response1.tontine = null;
                response1.versements = null;
                this.vol.concernes.push(response1);
              },
              (error1: HttpErrorResponse) => {
                console.log(error1.message);
              }
            )
          });
        }
        await new Promise(r => setTimeout(r, 2000));
        this.vol.tontineId = tontineId;
        this.vol.tontineNom = response.nom;
        this.vol.lieu = lieu;
        this.vol.date = date;
        this.vol.description = descript;
        console.log(Object.values(this.vol));
        this.volsService.ajoutVol(this.vol).subscribe(
          (response2: Vols) => {
            console.log(Object.values(response2));
            this.getDepositions();
            Swal.fire(
              'Déposition de vol enregistrée !',
              'Cette déposition a été enregistrée avec succes.',
              'success'
            )
            let btn = document.getElementById('fermetureA');
            btn.click();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
            Swal.fire(
              'Déposition de vol non enregistrée !',
              'Un problème est suvenu lors de l\'envoi de cette déposition de vol.\nIndice: Description trop longue.',
              'warning'
            )
          }
        )
      }
    )
  }

  // Methode pour la modification de la deposition de vol
  public modification(mod: NgForm){
    console.log(Object.values(this.volSelected));
    let id = this.volSelected.id;
    let tontineId = this.volSelected.tontineId;
    let lieu = this.volSelected.lieu
    let date = this.volSelected.date;
    let descript = this.volSelected.description;
    let parts = this.selectedParticipants;
    this.volSelected.concernes = [];
    this.tontineService.rechercheTontine(tontineId).subscribe(
      (response: Tontine) => {
        if (parts.length != 0) {
          parts.forEach(id => {
            this.participantService.rechercherParticipant(id).subscribe(
              (response1: Participant) => {
                response1.tontine = null;
                response1.versements = null;
                this.volSelected.concernes.push(response1);
              },
              (error1: HttpErrorResponse) => {
                console.log(error1.message);
              }
            )
          });
        }
        this.volSelected.id = id;
        this.volSelected.tontineId = tontineId;
        this.volSelected.tontineNom = response.nom;
        this.volSelected.lieu = lieu;
        this.volSelected.date = date;
        this.volSelected.description = descript;
        this.volSelected.owner = this.user;
        this.volSelected.owner.tontine = null;
        this.volSelected.owner.signals = null;
        this.volSelected.owner.vols = null;
        this.volSelected.owner.impayes = null;
        this.volsService.modifVol(this.volSelected).subscribe(
          (response2: Vols) => {
            console.log(response2);
            this.getDepositions();
            Swal.fire(
              'Déposition de vol modifiée !',
              'Cette déposition a été modifiée avec succes.',
              'success'
            )
            let btn = document.getElementById('fermetureM');
            btn.click();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
            Swal.fire(
              'Déposition de vol non modifiée !',
              'Un problème est suvenu lors de la modification de cette déposition de vol.\nIndice: Description trop longue.',
              'warning'
            )
          }
        )
      }
    )
  }

  // Methode pour recuperer la liste des participants lorsqu'une tontine est selectionnee dans le formulaire
  public listParticipants(tontineId: NgModel){
    if (tontineId.value != null) {
      this.tontineService.rechercheTontine(tontineId.value).subscribe(
        (response: Tontine) => {
          this.tontineSelect = response;
          this.participantsTontine = this.tontineSelect.participant;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    }
  }

  // Methode pour recuperer les participants selectiones ayant un rapport avec le vol dans une tontine
  getParticipantId(e: any, participantId: number){
    if (e.target.checked) {
      if (this.selectedParticipants.includes(participantId) == false) {
        console.log("L'id "+participantId+" est selectionné !");
        this.selectedParticipants.push(participantId);
      }
    } else {
      console.log("L'id "+participantId+" n'est pas selectionné !");
      this.selectedParticipants = this.selectedParticipants.filter(m=>m!=participantId);
    }
    console.log(this.selectedParticipants);
  }

  reinit(tontineId: NgModel){
    if (tontineId.value != null) {
      if (this.selectedParticipants.length != 0){
        this.selectedParticipants.length = 0;
      }
    }
  }
  
  supprimerDeposition(volId: number) {
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: 'Vous êtes sur le point de supprimer une déposition de vol !',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: "rgb(220, 53, 69)",
      confirmButtonText: 'Oui, supprimer !',

    }).then((result) => {
      if (result.value) {
        this.volsService.supVol(volId).subscribe(
          (response: void) => {
            console.log(response);
            Swal.fire(
              'Déposition de vol supprimée !',
              'Cette déposition a été supprimée avec succes.',
              'success'
            )
            this.getDepositions();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        )
        this.getDepositions();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'La suppression n\'a pas eu lieu.',
          'info'
        )
      }
    })
  }
    
  public searchVols(key: string): void {
    const results: Vols[] = [];
    for(const vol of this.listVols) {
      if (vol.lieu.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || vol.tontineNom.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(vol);
      }
    }
    this.listVols = results;
    if (results.length === 0 || !key) {
      this.getDepositions();
    }
  }
}