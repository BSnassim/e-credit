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

  validation_messages = {
    'nom': [
      {type: 'required', message: 'Ce champ est obligatoire.'},
      {type: 'pattern', message: 'Le nom ne doit pas contenir de caractères spéciaux.'}
    ],
    'prenom': [
      {type: 'required', message: 'Ce champ est obligatoire.'},
      {type: 'pattern', message: 'Le prenom ne doit pas contenir de caractères spéciaux.'}
    ],
    'typePiece': [
      {type: 'required', message: 'Ce champ est obligatoire.'}
    ],
    'numPiece': [
      {type: 'required', message: 'Ce champ est obligatoire.'},
      {type: 'pattern', message: 'Numéro invalide.'},
      {type: 'maxlength', message: 'Numéro invalide.'},
      {type: 'minlength', message: 'Numéro invalide.'}
    ],
    'numCompte': [
      {type: 'required', message: 'Ce champ est obligatoire.'},
      {type: 'pattern', message: 'Numéro de compte invalide.'},
      {type: 'minlength', message: 'Le numéro de compte doit contenir 13 chiffres.'}
    ],
    'dateCompte': [
      {type: 'required', message: 'Ce champ est obligatoire.'}
    ],
    'dateNaissance': [
      {type: 'required', message: 'Ce champ est obligatoire.'}
    ],
    'sitFamiliale': [
      {type: 'required', message: 'Ce champ est obligatoire.'}
    ],
    'sitMedicale': [
      {type: 'required', message: 'Ce champ est obligatoire.'}
    ],
    'sitProfessionnel': [
      {type: 'required', message: 'Ce champ est obligatoire.'}
    ],
    'gsm': [
      {type: 'required', message: 'Ce champ est obligatoire.'},
      {type: 'pattern', message: 'Le numéro de telephone doit contenir que des chiffres.'},
      {type: 'minlength', message: 'Le numéro de telephone doit contenir 8 chiffres.'}
    ],
    'montant': [
      {type: 'required', message: 'Ce champ est obligatoire.'},
      {type: 'pattern', message: 'Le montant doit contenir que des chiffres.'}
    ],
    'nbreEcheance': [
      {type: 'required', message: 'Ce champ est obligatoire.'},
      {type: 'pattern', message: 'Ce champ doit contenir que des chiffres'},
      {type: 'max', message: 'Le nombre maximales des echeances est : [Par mois: 360, Par an: 30].'},
      {type: 'min', message: 'Le nombre minimales des echeances est 1.'}
    ],
    'unite': [
      {type: 'required', message: 'Ce champ est obligatoire.'}
    ],
    'typeCredit': [
      {type: 'required', message: 'Ce champ est obligatoire.'}
    ],
    'salaire': [
      {type: 'required', message: 'Ce champ est obligatoire.'},
      {type: 'pattern', message: 'Ce champ doit contenir que des chiffres'},
    ],
    'autreRevenu': [
      {type: 'required', message: 'Ce champ est obligatoire.'},
      {type: 'pattern', message: 'Ce champ doit contenir que des chiffres'},
    ],
    'sitLogement': [
      {type: 'required', message: 'Ce champ est obligatoire.'}
    ],  
  }

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
    private route: ActivatedRoute,
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
        montant: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])],
        nbreEcheance: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])],
        unite: ['', Validators.required],
        typeCredit: ['', Validators.required],
        salaire: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])],
        autreRevenu: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])],
        sitLogement: ['', Validators.required]
      },
      { updateOn: 'change' }
    );
    this.controlNumPieceInput();
    this.controlEcheanceInput();
  }

  controlNumPieceInput() {
    this.simForm.get('typePiece').valueChanges.subscribe(value => {
      if (value == "CIN") {
        this.simForm.controls.numPiece.setValue(null);
        this.simForm.get('numPiece').setValidators(Validators.compose([
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8),
          Validators.pattern(/^[0-9]+$/)
        ]))
      } else if (value == "Passeport") {
        this.simForm.controls.numPiece.setValue(null);
        this.simForm.get('numPiece').setValidators(Validators.compose([
          Validators.required,
          Validators.maxLength(9),
          Validators.minLength(9),
          Validators.pattern(/^[A-Za-z0-9]+$/)
        ]))
      }
    });
  }
  controlEcheanceInput() {
    this.simForm.get('unite').valueChanges.subscribe(value => {
      if (value == "Mois") {
        this.simForm.controls.nbreEcheance.setValue(null);
        this.simForm.get('nbreEcheance').setValidators(Validators.compose([
          Validators.required,
          Validators.max(360),
          Validators.min(1), 
          Validators.pattern(/^[0-9]+$/)
        ]))
      } else if (value == "An") {
        this.simForm.controls.nbreEcheance.setValue(null);
        this.simForm.get('nbreEcheance').setValidators(Validators.compose([
          Validators.required,
          Validators.max(30),
          Validators.min(1), 
          Validators.pattern(/^[0-9]+$/)
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
