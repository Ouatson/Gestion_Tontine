import { HttpErrorResponse } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Signals } from 'src/app/Services/Problemes/Signals/signals';
import { SignalsService } from 'src/app/Services/Problemes/Signals/signals.service';
import { User } from 'src/app/Services/User/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.css']
})
export class SignalComponent implements OnInit {
  user: User;
  
  EmpAllTab: boolean = true;
  modalRef: BsModalRef;

  public listSignals: Signals[] = [];
  public signal = new Signals();
  public signalSelected: Signals;

  constructor(private modalService: BsModalService,
    private signalsService: SignalsService) {
      this.user = JSON.parse(localStorage.getItem("userConnected"));
      moment.locale("fr");
      signalsService.listen().subscribe((m:any)=>{
        this.getDepositions();
      })
    }

  ngOnInit(): void {
    this.getDepositions();
  }

  // Methode pour recuperer les depositions concernant les signalements
  public getDepositions(): void {
    this.signalsService.listerTout(this.user.id).subscribe(
      (response: Signals[]) => {
        response.forEach(signal => {
          signal.dateDeposition = moment(signal.dateDeposition).format('LLLL');
        });
        this.listSignals = response;
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

  modifDeposition(content: TemplateRef<any>, signal: Signals) {
    this.signalSelected = signal;
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  // Methode pour la soumission d'un signalement
  public soumission(signal: NgForm){
    console.log(signal.form);
    this.signal.utilisateur = this.user;
    this.signal.utilisateur.tontine = null;
    this.signal.utilisateur.signals = null;
    this.signal.utilisateur.vols = null;
    this.signal.utilisateur.impayes = null;
    this.signal.dateDeposition = moment().toISOString();
    this.signalsService.ajoutSignal(this.signal).subscribe(
      (response: Signals) => {
        Swal.fire(
          'Signalement enregistré !',
          'Ce signalement a été enregistré avec succes.',
          'success'
        )
        let btn = document.getElementById('fermetureA');
        btn.click();
        this.getDepositions();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire(
          'Signalement non enregistré !',
          'Une erreur est surevenue lors de l\'envoi de ce signalement.\nVeuillez réessayer svp !Indice: Description trop longue.',
          'warning'
        )
      }
    )
  }

  // Methode pour modifier un signal
  public modifier(mod: NgForm){
    console.log(mod.form);
    this.signalSelected.dateDeposition = moment().toISOString();
    this.signalSelected.utilisateur = this.user;
    this.signalSelected.utilisateur.tontine = null;
    this.signalSelected.utilisateur.signals = null;
    this.signalSelected.utilisateur.vols = null;
    this.signalSelected.utilisateur.impayes = null;
    console.log(Object.values(this.signalSelected));
    this.signalsService.modifSignal(this.signalSelected).subscribe(
      (response: Signals) => {
        Swal.fire(
          'Signalement modifié !',
          'Ce signalement a été modifié avec succes.',
          'success'
        )
        let btn = document.getElementById('fermetureM');
        mod.reset();
        btn.click();
        this.getDepositions();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire(
          'Signalement non modifié !',
          'Une erreur est surevenue lors de la modification de ce signalement.\nVeuillez réessayer svp !Indice: Description trop longue.',
          'warning'
        )
      }
    )
  }

  supprimerDeposition(signalId: number) {
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: 'Vous êtes sur le point de supprimer un signalement!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: "rgb(220, 53, 69)",
      confirmButtonText: 'Oui, supprimer !',

    }).then((result) => {
      if (result.value) {
        this.signalsService.supSignal(signalId).subscribe(
          (response: void) => {
            Swal.fire(
              'Signalement supprimé !',
              'Ce signalement a été supprimé avec succes.',
              'success'
            )
            this.getDepositions();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'La suppression n\'a pas eu lieu.',
          'error'
        )
      }
    })
  }
  
  public searchSignal(key: string): void {
    const results: Signals[] = [];
    for(const signal of this.listSignals) {
      if (signal.objet.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || signal.dateDeposition.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(signal);
      }
    }
    this.listSignals = results;
    if (results.length === 0 || !key) {
      this.getDepositions();
    }
  }
}
