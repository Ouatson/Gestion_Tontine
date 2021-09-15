import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import { User } from 'src/app/Services/User/user';
import { UserService } from 'src/app/Services/User/user.service';
import { TontineService } from 'src/app/Services/Tontine/tontine.service';
import { Tontine } from 'src/app/Services/Tontine/tontine';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { Participant } from 'src/app/Services/Participants/participant';
import { NgForm } from '@angular/forms';
import { ParticipantService } from 'src/app/Services/Participants/participant.service';

@Component({
  selector: 'app-mes-tontines',
  templateUrl: './mes-tontines.component.html',
  styleUrls: ['./mes-tontines.component.scss']
})
export class MesTontinesComponent implements OnInit {
  public user: User;
  public tontines: Tontine[] = [];
  public tontine = new Tontine();
  public tontineSelect: Tontine;
  public tontinesTermines: Tontine[] = [];
  public tontinesEnCours: Tontine[] = [];
  public tontinesIncompletes: Tontine[] = [];

  public moiPart = new Participant();
  public participant = new Participant();
  public participantsTontine: Participant[] = [];
  public participantsRetire: Participant[] = [];
  
  public nombrePart: number;

  public probleme: string;
  public telprobleme: string;

  public today;
  public datesTontines: string[] = new Array<string>();
  public dateSuivante: string;

  EmpAllTab: boolean = true;
  Part: boolean = true;
  PartRet: boolean;
  modalRef: BsModalRef;
  modalRefChild: BsModalRef;

  constructor(private modalService: BsModalService, private userService: UserService,
    private tontineService: TontineService, private participantService: ParticipantService) {
    this.user = JSON.parse(localStorage.getItem("userConnected"));
    userService.listen().subscribe((m:any)=>{
      this.getMyTontines();
    })
  }

  ngOnInit(): void {
    this.getMyTontines();
    this.tontine.typeTirage = "";
    this.tontine.tirage = "";
  }

  // Modal pour les details de tontine
  details(content: TemplateRef<any>, tontine: Tontine) {
    this.tontineSelect = tontine;
    this.dates();
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.getDateSuivante();
  }

  ajoutModal(content) {
    this.today = moment().format('YYYY-MM-DD');
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  modifModal(content: TemplateRef<any>, tontine: Tontine) {
    this.tontineSelect = tontine;
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  partModal(content: TemplateRef<any>, tontine: Tontine) {
    this.tontineSelect = tontine;
    this.participantsTontine = tontine.participant;
    this.nombrePart = tontine.nombrePart;
    this.participantsTontine.forEach(part => {
      if (part.tirage) {
        this.participantsRetire.push(part);
      }
    });
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  ajoutPart(content: TemplateRef<any>) {
    this.modalRefChild = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  // Les tontines que j'ai créé
  public getMyTontines(): void{
    this.userService.mesTontines(this.user.id).subscribe(
      (response: Tontine[]) => {
        this.tontines = response;
        this.tontinesTerm(this.tontines);
        this.tontinesCours(this.tontines);
        this.tontinesIncomp(this.tontines);
        this.actualiseTontines();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  // Tontines terminees/passees
  tontinesTerm(tontines: Tontine[]) {
    if (tontines.length != 0) {
      tontines.forEach(tontine => {
        let fin = moment(tontine.dateFin, "YYYY/MM/DD");
        if (moment().endOf('day').isAfter(fin)) {
          this.tontinesTermines.push(tontine);
        }
      });
    } else {
      this.tontinesTermines.length = 0;
    }
  }

  // Tontines en cours
  tontinesCours(tontines: Tontine[]) {
    if (tontines.length != 0) {
      tontines.forEach(tontine => {
        let debut = moment(tontine.dateDebut, "YYYY/MM/DD");
        let fin = moment(tontine.dateFin, "YYYY/MM/DD");
        if (moment().endOf('day').isBefore(fin) && moment().endOf('day').isAfter(debut)) {
          this.tontinesEnCours.push(tontine);
        }
      });
    } else {
      this.tontinesEnCours.length = 0;
    }
  }

  // Tontine dont les participants ne sont pas au complet (incompletes)
  tontinesIncomp(tontines: Tontine[]) {
    if (tontines.length != 0) {
      tontines.forEach(tontine => {
        let nombrePart = tontine.nombrePart;
        let participants = tontine.participant.length;
        if (nombrePart != participants) {
          this.tontinesIncompletes.push(tontine);
        }
      });
    } else {
      this.tontinesIncompletes.length = 0;
    }
  }

  // Desactiver les buttons de modification et de suppression quand la tontine a debute
  notPosiblle(dateDebut: any): boolean{
    let debut = moment(dateDebut);
    if (moment().isAfter(debut.endOf('day'))) {
      return true;
    } else {
      return false;
    }
  }

  // Actualiser si la date de debut de la tontine est posterieure a la date d'aujourd'hui et que les participants ne sont pas au complet
  // Actulaiser nombre de participants et date de fin de la tontine
  public actualiseTontines(){
    this.tontines.forEach(tontine => {
      let debut = moment(tontine.dateDebut);
      let tirage = tontine.tirage;
      let occ;
      this.today = moment();
      if (debut.endOf('day').isBefore(this.today)) {
        if (tontine.nombrePart > tontine.participant.length) {
          tontine.nombrePart = tontine.participant.length;
          if (tirage == "Jours") {
            let cicle = tontine.periodicite;
            debut.add(cicle*tontine.nombrePart, 'days');
            occ = debut.format("YYYY-MM-DD");
            tontine.dateFin = occ;
          }
          if (tirage == "Semaines") {
            let cicle = tontine.periodicite;
            debut.add(cicle*tontine.nombrePart, 'weeks');
            occ = debut.format("YYYY-MM-DD");
            this.datesTontines.push(occ);
          }
          if (tirage == "Mois") {
            let cicle = tontine.periodicite;
            debut.add(cicle*tontine.nombrePart, 'months');
            occ = debut.format("YYYY-MM-DD");
            this.datesTontines.push(occ);
          }
          this.userService.rechercheUser(tontine.proprietaire).subscribe(
            (response: User) => {
              response.tontine = null;
              let proprio = response;
              tontine.proprietaire = null;
              this.tontineService.modifierTontine(tontine).subscribe(
                (response: Tontine) => {
                  this.tontineService.mettreProprio(proprio, response.id).subscribe(
                    (response2: Tontine) => {
                      console.log(response2.nom+ " : Mis a jour");
                    },
                    (error2: HttpErrorResponse) => {
                      console.log(error2.message);
                    }
                  )
                  this.getMyTontines();
                },
                (error: HttpErrorResponse) => {
                  console.log(error.message);
                }
              )
            }
          )
        }
      }
    });
  }

  // Methode pour nouvelle tontine
  public nouvelleTontine(nouv: NgForm){
    if(this.tontine.nombrePart > 2) {
      this.probleme = this.moiPart.probleme;
      this.telprobleme = this.moiPart.telprobleme;
      this.tontine.proprietaire = this.user;
      this.tontine.proprietaire.tontine = null;
      this.tontineService.ajouterTontine(this.tontine).subscribe(
        (response: Tontine) => {
          Swal.fire(
            'Bien enregistré !',
            'Nouvelle tontine créée !',
            'success'
          )
          this.firstPart(this.probleme, this.telprobleme);
          this.moiPart.tontine = response;
          this.moiPart.tontine.proprietaire = null;
          this.participantService.ajouterParticipant(this.moiPart).subscribe(
            (response: Participant) => {
              console.log('Nouveau participant: '+response.prenom+' !');
              this.getMyTontines();
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
            'Un problème est survenu lors de la création .\nVeuillez réessayer svp !',
            'error'
          )
        }
      )
      let btn = document.getElementById('fermeture');
      nouv.reset();
      this.getMyTontines();
      btn.click();
    } else {
      Swal.fire(
        'Erreur !',
        'Au moins 3 participants requis pour la création d\'une tontine !',
        'error'
      )
    }
  }

  // Nouvelle tontine => ajout proprietaire comme etant participant
  firstPart(a: string, b: string){
    this.moiPart.nom = this.user.nom;
    this.moiPart.prenom = this.user.prenom;
    this.moiPart.email = this.user.email;
    this.moiPart.dateNaiss = this.user.dateNaiss;
    this.moiPart.adresse = this.user.adresse;
    this.moiPart.numTel = this.user.numTel;
    this.moiPart.profession = this.user.profession;
    this.moiPart.sexe = this.user.sexe;
    this.moiPart.status_matrimonial = this.user.status_matrimonial;
    this.moiPart.probleme = a;
    this.moiPart.telprobleme = b;
    this.moiPart.retard = 0;
    this.moiPart.mise_montant = 0;
    this.moiPart.tirage = false;
    this.moiPart.date_versement = null;
  }

  // Date des tirages pour la tontine
  public dates(){
    let debut = moment(this.tontineSelect.dateDebut);
    let fin = moment(this.tontineSelect.dateFin);
    let tirage = this.tontineSelect.tirage;
    this.datesTontines.length = 0;
    let occ;
    if (tirage == "Jours") {
      let cicle = this.tontineSelect.periodicite;
      while (debut.isBefore(fin)) {
        occ = debut.toLocaleString();
        this.datesTontines.push(occ);
        debut.add(cicle, 'days');
      }
    }
    if (tirage == "Semaines") {
      let cicle = this.tontineSelect.periodicite;
      while (debut.isBefore(fin)) {
        occ = debut.toLocaleString();
        this.datesTontines.push(occ);
        debut.add(cicle, 'weeks');
      }
    }
    if (tirage == "Mois") {
      let cicle = this.tontineSelect.periodicite;
      while (debut.isBefore(fin)) {
        occ = debut.toLocaleString();
        this.datesTontines.push(occ);
        debut.add(cicle, 'months');
      }
    }
  }

  // Connaitre date suivante pour le tirage
  public getDateSuivante(){
    this.today = moment();
    for (let i = 0; i < this.datesTontines.length; ++i) {
      let stop = false;
      let dateS = document.getElementById('dateS');
      let d = moment(this.datesTontines[i]);
      if(d.endOf('day').isSame(moment().endOf('day')) || d.isAfter(this.today)){
        this.dateSuivante = d.format('DD/MM/YYYY');
        dateS.innerHTML = this.dateSuivante;
        stop = true;
        if (stop) return;
      }
      else{
        this.dateSuivante = this.datesTontines[this.datesTontines.length-1];
        dateS.innerHTML = this.dateSuivante;
      }
    }
  }

  // Methode modifictaion de tontine
  public modifierTontine(mod: NgForm){
    this.tontineSelect.proprietaire = null;
    this.tontineService.modifierTontine(this.tontineSelect).subscribe(
      (response: Tontine) => {
        this.userService.rechercheUser(this.user.id).subscribe(
          (response2: User) => {
            this.tontineService.mettreProprio(response2, response.id).subscribe(
              (response3: Tontine) => {
                Swal.fire(
                  'Tontine modifiée !',
                  'Cette tontine a été modifiée avec succes.',
                  'success'
                )
                this.getMyTontines();
              },
              (error2: HttpErrorResponse) => {
                console.log(error2.message);
                Swal.fire(
                  'Erreur !',
                  'Un problème est survenu lors de la modification .\nVeuillez réessayer svp !',
                  'error'
                )
              }
            )
          }
        )
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
    let btn = document.getElementById('fermM');
    mod.reset();
    this.getMyTontines();
    btn.click();
  }

  // Methode ajout de participant
  public ajouterParticipant(partForm: NgForm){
    this.participant.mise_montant = 0;
    this.participant.retard = 0;
    this.participant.tirage = false;
    this.participant.date_versement = null;
    this.tontineSelect.proprietaire = null;
    this.tontineSelect.demandes = null;
    this.tontineSelect.tirages = null;
    this.tontineSelect.participant = null;
    this.participant.tontine = this.tontineSelect;
    this.participantService.ajouterParticipant(this.participant).subscribe(
      (response: Participant) => {
        this.participantsTontine.push(response);
        Swal.fire(
          'Participant ajouté !',
          'Ce particiant a bien été ajouté à la tontine avec succes.',
          'success'
        )
        let btn = document.getElementById('fermAP');
        partForm.reset();
        this.getMyTontines();
        btn.click();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire(
          'Participant non ajouté !',
          'Un participant dans cette tontine a le même email et le même numero !',
          'error'
        )
      }
    )
  }

  onTab(number) {
    this.Part = false;
    this.PartRet = false;

    if (number == '1') {
      this.Part = true;
    }
    else if (number == '2') {
      this.PartRet = true;
    }
  }

  supAlert(tontineId: number) {
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: 'Votre tontine sera irrécupérable après cette suppression !',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: "rgb(220, 53, 69)",
      confirmButtonText: 'Oui, supprimer !',

    }).then((result) => {
      if (result.value) {
        this.tontineService.supprimerTontine(tontineId).subscribe(
          (response: void) => {
            this.getMyTontines();
            Swal.fire(
              'Tontine Supprimée !',
              'Cette tontine a été supprimée avec succes.',
              'success'
            )
            this.getMyTontines();
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

  suppress(partId: number) {
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: 'Ce participant sera supprimé de votre tontine !',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: "rgb(220, 53, 69",
      confirmButtonText: 'Oui, supprimer !',
      
    }).then((result) => {
      if (result.value) {
        this.participantService.supprimerParticipant(partId).subscribe(
          (response: void) => {
            this.getMyTontines();
            Swal.fire(
              'Participant Supprimé !',
              'Le participant a été supprimé avec succes:',
              'success'
            )
            this.getMyTontines();
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
        this.getMyTontines();
      }
    }
}