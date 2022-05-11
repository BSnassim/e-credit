import { Demande } from './../../models/credit/demande';
import { TokenService } from './../../auth/services/token.service';
import { DemandeCreditService } from './../../services/demande-credit.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list-credit',
  templateUrl: './list-credit.component.html',
  styleUrls: ['./list-credit.component.scss'],
})
export class ListCreditComponent implements OnInit, OnDestroy {

  demandes: {
    id: number;
    nomprenom: string;
    type: number;
    dateCreation: Date;
    montant: number;
    etat: string;
    enAttente: string;
    gsm: number;
    phase: number;
    idSimulation: number;
  }[] = [];

  loading;

  constructor(
    private demandeCreditService: DemandeCreditService,
    private tokenService: TokenService,
    private loadingController: LoadingController
  ) { }

  ngOnDestroy(): void {
    this.loading.dismiss();
  }

  ngOnInit() {
    this.presentLoading().then(() =>
      this.getUser().then((res) => {
        this.getDemandesByUser(res.id);
        this.loading.dismiss();
      })
    );
  }

  doRefresh(event) {
    setTimeout(() => {
      this.demandes = [];
      this.getUser().then((res) => {
        this.getDemandesByUser(res.id);
      })
      event.target.complete();
    }, 2000);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Chargement...',
      id: "1"
    });
    await this.loading.present();
  }

  async getUser() {
    const res = await this.tokenService.getUser().toPromise();
    return res;
  }

  getDemandesByUser(id: number) {
    this.demandeCreditService.getDemandesByUser(id).subscribe(data => {
      data.forEach((e) => {
        this.getPhase(e.idPhase).then((res) => {
          this.demandes.push({
            id: e.idDemande,
            nomprenom: e.nom + " " + e.prenom,
            dateCreation: new Date(e.datePhase),
            montant: e.montant,
            type: e.idTypeCredit,
            etat: res.etape,
            enAttente: res.enAttenteDe,
            phase: e.idPhase,
            gsm: e.gsm,
            idSimulation: e.idSimulation
          });
        });
      });
    });
  }

  async getPhase(id: number) {
    const prom = await this.demandeCreditService.getPhaseById(id).toPromise();
    return prom;
  }

  details(id:number){

  }

}
