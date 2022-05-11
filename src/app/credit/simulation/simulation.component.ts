import { Component, OnInit, ViewChild } from '@angular/core';
import { Simulation } from 'src/app/models/credit/simulation';
import { TypeCredit } from 'src/app/models/credit/type-credit';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss'],
})
export class SimulationComponent implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  date;

  echeanceOptions = [{ id: 1, name: 'Mois' }, { id: 2, name: 'An' }];
  selectedEcheance = {} as { id: number, name: string };

  familialeOptions = [{ id: 1, name: "Marié(e)" }, { id: 2, name: "Célibataire" }, { id: 3, name: "Divorcé(e)" }, { id: 4, name: "Veuf(ve)" }];
  selectedFamiliale = {} as { id: number, name: string };

  emploiOptions = [{ id: 1, name: 'Salarié' }, { id: 2, name: "Fonction libérale" }, { id: 3, name: "Retraité" }, { id: 4, name: "Rentier" }];
  selectedEmploi = {} as { id: number, name: string };

  medicaleOptions = [{ id: 1, name: 'Bon santé' }, { id: 2, name: "Maladie chronique" }];
  selectedMedicale = {} as { id: number, name: string };

  logementOptions = [{ id: 1, name: 'Locataire' }, { id: 2, name: "Propriétaire" }];
  selectedLogement = {} as { id: number, name: string };

  pieceOptions = [{ id: 1, name: "CIN" }, { id: 2, name: "Passeport" }];
  selectedPiece = {} as { id: number, name: string };

  typesCredit: TypeCredit[];
  selectedCredit: TypeCredit;

  simulation = {} as Simulation;

  constructor() { }

  ngOnInit() { }

  formatDate(value: string) {
    let date = format(parseISO(value), 'dd/MM/yyyy');
    let dateParts = date.split("/");
    let dateObject = new Date(+dateParts[2], +dateParts[1]-1, +dateParts[0]);
    return dateObject;
  }

}
