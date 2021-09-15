import { HttpErrorResponse } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Participant } from 'src/app/Services/Participants/participant';
import { Tontine } from 'src/app/Services/Tontine/tontine';
import { TontineService } from 'src/app/Services/Tontine/tontine.service';
import { User } from 'src/app/Services/User/user';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-mes-participations',
  templateUrl: './mes-participations.component.html',
  styleUrls: ['./mes-participations.component.scss']
})
export class MesParticipationsComponent implements OnInit {
  public user: User;
  public autruiUser: User;
  
  public tontineSelect: Tontine;
  public tontinesParticipations: Tontine[] = [];
  public tontinesTermines: Tontine[] = [];
  public tontinesEnCours: Tontine[] = [];
  public tontinesIncompletes: Tontine[] = [];
  
  public today;
  public code: string;
  public datesTontines: string[] = new Array<string>();
  public dateSuivante: string;

  public participantsTontine: Participant[] = [];
  public participantsRetire: Participant[] = [];
  
  EmpAllTab: boolean = true;
  Part: boolean = true;
  PartRet: boolean;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
    private tontineService: TontineService,
    private userService: UserService) {
      this.user = JSON.parse(localStorage.getItem("userConnected"));
      tontineService.listen().subscribe((m:any)=>{
        this.getTontines();
      })
    }

  ngOnInit(): void {
    this.getTontines();
  }

  public getTontines(): void{
    this.tontineService.touteTontines(this.user.id).subscribe(
      (response: Tontine[]) => {
        response.forEach(tontine => {
          let numb = tontine.proprietaire;
          this.userService.rechercheUser(numb).subscribe(
            (response: User) => {
              this.autruiUser = response;
              if (this.autruiUser.id != this.user.id) {
                tontine.proprietaire = this.autruiUser;
                this.tontinesParticipations.push(tontine);
                this.tontinesTerm(tontine);
                this.tontinesCours(tontine);
                this.tontinesIncomp(tontine);
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

  // Tontines terminees/passees
  tontinesTerm(tontine: Tontine) {
    let fin = moment(tontine.dateFin, "YYYY/MM/DD");
    if (moment().endOf('day').isAfter(fin)) {
      this.tontinesTermines.push(tontine);
    }
  }

  // Tontines en cours
  tontinesCours(tontine: Tontine) {
    let debut = moment(tontine.dateDebut, "YYYY/MM/DD");
    let fin = moment(tontine.dateFin, "YYYY/MM/DD");
    if (moment().endOf('day').isBefore(fin) && moment().endOf('day').isAfter(debut)) {
      this.tontinesEnCours.push(tontine);
    }
  }

  // Tontine dont les participants ne sont pas au complet (incompletes)
  tontinesIncomp(tontine: Tontine) {
    let nombrePart = tontine.nombrePart;
    let participants = tontine.participant.length;
    if (nombrePart != participants) {
      this.tontinesIncompletes.push(tontine);
    }
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

  details(content: TemplateRef<any>, tontine: Tontine) {
    this.tontineSelect = tontine;
    this.dates();
    this.modalRef = this.modalService.show(
      content,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.getDateSuivante();
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

  partModal(content: TemplateRef<any>, tontine: Tontine) {
    this.participantsRetire.length = 0;
    this.tontineSelect = tontine;
    this.participantsTontine = tontine.participant;
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
  
  public searchTontines(key: string): void {
    const results: Tontine[] = [];
    for(const tontine of this.tontinesParticipations) {
      if (tontine.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || tontine.code.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(tontine);
      }
    }
    this.tontinesParticipations = results;
    if (results.length === 0 || !key) {
      this.getTontines();
    }
  }
}