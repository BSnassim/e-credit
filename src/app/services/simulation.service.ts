import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Simulation } from '../models/credit/simulation';

const URL = environment.apiURL + "/simulation";

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  constructor(private http: HttpClient) { }

  saveSimulation(sim: Simulation){
    return this.http.post<number>(URL, sim);
  }

  getSimulationById(id: number): Observable<Simulation> {
    return this.http.get<Simulation>(URL + "/" + id);
  }

  calculateSimulation(sim: Simulation) {
    let resultat: number = 0;
    let revenuMensuel = sim.salaire + sim.autreRevenu;
    let revenuAnnuel = revenuMensuel * 12;
    let revenu: number;
    let EMI = sim.montant / sim.nbreEcheance;
    let today = new Date(Date.now());
    let age = today.getFullYear() - sim.dateNaissance.getFullYear();
    if (sim.unite == "Mois") {
      revenu = revenuMensuel;
    } else {
      revenu = revenuAnnuel;
    }

    let pourcentage = (EMI / revenu) * 100;

    switch (sim.sitFamiliale) {
      case "Marié(e)":
        resultat += 2;
        break;
      case "Célibataire":
        resultat += 8;
        break;
      case "Divorcé(e)":
        resultat += 4;
        break;
      case "Veuf(ve)":
        resultat += 6;
        break;
    }

    switch (sim.sitProfessionnel) {
      case "Salarié":
        resultat += 12;
        break;
      case "Fonction libérale":
        resultat += 14;
        break;
      case "Retraité":
        resultat += 6;
        break;
      case "Rentier":
        resultat += 10;
        break;
    }

    switch (sim.sitLogement) {
      case "Locataire":
        resultat += 5;
        break;
      case "Propriétaire":
        resultat += 14;
        break;
    }

    switch (sim.sitMedicale) {
      case "Bon santé":
        resultat += 8;
        break;
      case "Maladie chronique":
        resultat += 4;
        break;
    }

    if (pourcentage <= 20) {
      resultat += 40;
    }
    else if (pourcentage <= 40) {
      resultat += 35;
    }
    else if (pourcentage <= 50) {
      resultat += 25;
    }
    else if (pourcentage <= 60) {
      resultat += 20;
    }
    else if (pourcentage <= 70) {
      resultat += 15;
    }
    else if (pourcentage <= 80) {
      resultat += 10;
    }
    else if (pourcentage >= 90) {
      resultat = 0;
    }

    if (age >= 60) {
      resultat += 4;
    } else if (age < 60 && age >= 30) {
      resultat += 12;
    }
    else if (age < 30 && age >= 18) {
      resultat += 8;
    }
    else {
      resultat = 0;
    }

    return resultat;

  }

}
