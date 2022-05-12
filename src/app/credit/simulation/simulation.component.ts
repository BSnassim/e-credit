import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeCreditService } from './../../services/demande-credit.service';
import { SimulationService } from './../../services/simulation.service';
import { TokenService } from './../../auth/services/token.service';
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

  simForm: FormGroup;

  echeanceOptions = ['Mois', 'An'];
  selectedEcheance: string;

  familialeOptions = ["Marié(e)", "Célibataire", "Divorcé(e)", "Veuf(ve)"];
  selectedFamiliale: string;

  emploiOptions = ['Salarié', "Fonction libérale", "Retraité", "Rentier"];
  selectedEmploi: string;

  medicaleOptions = ['Bon santé', "Maladie chronique"];
  selectedMedicale: string;

  logementOptions = ['Locataire', "Propriétaire"];
  selectedLogement: string;

  pieceOptions = ["CIN", "Passeport"];
  selectedPiece: string;

  typesCredit: TypeCredit[];
  selectedCredit: TypeCredit;

  simulation = {} as Simulation;

  UserId: number;

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private simulationService: SimulationService,
    private demandeService: DemandeCreditService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUserID();
    this.getTypeCredit();
    this.simForm = this.formBuilder.group(
      {
        nom: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z]+$/)])],
        prenom: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z]+$/)])],
        typePiece: ['', Validators.required],
        numPiece: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)])],
        numCompte: ['', Validators.compose([Validators.required, Validators.minLength(13), Validators.pattern(/^[A-Za-z0-9]+$/)])],
        dateCompte: ['', Validators.required],
        dateNaissance: ['', Validators.required],
        sitFamiliale: ['', Validators.required],
        sitMedicale: ['', Validators.required],
        sitProfessionnel: ['', Validators.required],
        gsm: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9]+$/)])],
        montant: ['', Validators.compose([Validators.required, ])],
        nbreEcheance: ['', Validators.compose([Validators.required, ])],
        unite: ['', Validators.required],
        typeCredit: ['', Validators.required],
        salaire: ['', Validators.compose([Validators.required, ])],
        autreRevenu: ['', Validators.compose([Validators.required, ])],
        sitLogement: ['', Validators.required]
      },
      { updateOn: 'change' }
    );
    this.simForm.get('typePiece').valueChanges.subscribe(value => {
      if (value == "CIN") {
        this.simForm.controls.numPiece.setValue(null);
        this.simForm.get('numPiece').setValidators(Validators.compose([
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8)
        ]))
      } else if (value == "Passeport") {
        this.simForm.controls.numPiece.setValue(null);
        this.simForm.get('numPiece').setValidators(Validators.compose([
          Validators.required,
          Validators.maxLength(9),
          Validators.minLength(9)
        ]))
      }
    });
  }

  formatDate(value: string) {
    let date = format(parseISO(value), 'dd/MM/yyyy');
    let dateParts = date.split("/");
    let dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    return dateObject;
  }

  getUserID() {
    this.tokenService.getUser().subscribe(
      data => {
        this.UserId = data.id;
      }
    )
  }

  getTypeCredit() {
    this.demandeService.getTypeCreditAPI().subscribe((response) => {
      this.typesCredit = response;
    });
  }

  maxNumPiece() {
    if (this.simForm.value.typePiece == "CIN") {
      return 8;
    } else if (this.simForm.value.typePiece == "Passeport") {
      return 9;
    } else return 8;
  }

  submit() {

  }

}
