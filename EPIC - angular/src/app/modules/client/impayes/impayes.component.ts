import { HttpErrorResponse } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Impayes } from 'src/app/Services/Problemes/Impayes/impayes';
import { ImpayesService } from 'src/app/Services/Problemes/Impayes/impayes.service';
import { Tontine } from 'src/app/Services/Tontine/tontine';
import { TontineService } from 'src/app/Services/Tontine/tontine.service';
import { User } from 'src/app/Services/User/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impayes',
  templateUrl: './impayes.component.html',
  styleUrls: ['./impayes.component.css']
})
export class ImpayesComponent implements OnInit {
  user: User;

  public listImpayes: Impayes[] = [];
  public impaye = new Impayes();
  public impayeSelected: Impayes;

  public tontines: Tontine[] = [];
  public tontineSelect: Tontine;

  EmpAllTab: boolean = true;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
    private tontineService: TontineService,
    private impayesService: ImpayesService) {
      this.user = JSON.parse(localStorage.getItem("userConnected"));
      moment.locale("fr");
      impayesService.listen().subscribe((m:any)=>{
        this.getDepositions();
      })
    }

  ngOnInit(): void {
    this.getDepositions();
    this.getTontines();
    this.impaye.operateur = "";
  }

  // Methode pour recuperer les depositions concernant les impayes
  public getDepositions(){
    this.impayesService.listerTout(this.user.id).subscribe(
      (response: Impayes[]) => {
        response.forEach(impaye => {
          impaye.dateDeposition = moment(impaye.dateDeposition).format('LLLL');
        });
        this.listImpayes = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  // Tontines dont l'utilisateur fait parti
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

  modifDeposition(content: TemplateRef<any>, impaye: Impayes) {
    this.impayeSelected = impaye;
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  // Methode pour la soumission de cette deposition
  public soumission(impayes: NgForm){
    this.impaye.proprio = this.user;
    this.impaye.dateDeposition = moment().toISOString();
    let id = this.impaye.tontineId;
    let operateur = this.impaye.operateur;
    let descript = this.impaye.description;
    this.tontineService.rechercheTontine(id).subscribe(
      (response: Tontine) => {
        this.impaye.tontineId = id;
        this.impaye.tontineNom = response.nom;
        this.impaye.operateur = operateur;
        this.impaye.description = descript;
        this.impayesService.ajoutImpaye(this.impaye).subscribe(
          (response1: Impayes) => {
            Swal.fire(
              'Déposition d\'impayé enregistrée !',
              'Cette déposition a été enregistrée avec succes.',
              'success'
            )
            this.getDepositions();
            let btn = document.getElementById('fermetureA');
            btn.click();
          },
          (error1: HttpErrorResponse) => {
            console.log(error1.message);
          }
        )
      }
    )
  }

  // Methode pour modifier les impayes
  public modification(mod: NgForm){
    let id = this.impayeSelected.id;
    let tontineId = this.impayeSelected.tontineId;
    let operateur = this.impayeSelected.operateur;
    let descript = this.impayeSelected.description;
    this.impayeSelected.dateDeposition = moment().toISOString();
    this.impayeSelected.proprio = this.user;
    this.impayeSelected.proprio.tontine = null;
    this.impayeSelected.proprio.signals = null;
    this.impayeSelected.proprio.vols = null;
    this.impayeSelected.proprio.impayes = null;
    this.tontineService.rechercheTontine(tontineId).subscribe(
      (response: Tontine) => {
        this.impayeSelected.id = id;
        this.impayeSelected.tontineId = tontineId;
        this.impayeSelected.tontineNom = response.nom;
        this.impayeSelected.operateur = operateur;
        this.impayeSelected.description = descript;
        this.impayesService.modifImpaye(this.impayeSelected).subscribe(
          (response1: Impayes) => {
            Swal.fire(
              'Déposition d\'impayé modifiée !',
              'Cette déposition a été modifiée avec succes.',
              'success'
            )
            this.getDepositions();
            let btn = document.getElementById('fermetureM');
            btn.click();
          },
          (error1: HttpErrorResponse) => {
            console.log(error1.message);
          }
        )
      }
    )
  }

  supprimerDeposition(impayeId: number) {
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: 'Vous êtes sur le point de supprimer une déposition d\'impayé !',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: "rgb(220, 53, 69)",
      confirmButtonText: 'Oui, supprimer !',

    }).then((result) => {
      if (result.value) {
        this.impayesService.supImpaye(impayeId).subscribe(
          (response: void) => {
            Swal.fire(
              'Déposition d\'impayé supprimée !',
              'Cette déposition a été supprimée avec succes.',
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
  
  public searchImpaye(key: string): void {
    const results: Impayes[] = [];
    for(const impaye of this.listImpayes) {
      if (impaye.operateur.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || impaye.tontineNom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || impaye.dateDeposition.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(impaye);
      }
    }
    this.listImpayes = results;
    if (results.length === 0 || !key) {
      this.getDepositions();
    }
  }
}