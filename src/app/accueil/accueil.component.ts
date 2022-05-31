import { DemandeCreditService } from './../services/demande-credit.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../auth/services/token.service';
import { User } from '../models/user';
import { Historique } from '../models/historique';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {
  historiques: Historique[] = [];

  currentUser: User = new User();

  historique = {} as Historique;

  constructor(
    private tokenService: TokenService,
    private creditService: DemandeCreditService
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  LoadHistoriqueDemande(id: string) {
    this.creditService.getHistoriqueDemandeRecente(id).subscribe((data) => {
      this.historiques = data;
    });
  }

  loadUser() {
    this.tokenService.getUser().subscribe((data) => {
      this.currentUser = data;

      this.LoadHistoriqueDemande(data.id);
    });
  }
}
