import { DemandeCreditService } from './../../services/demande-credit.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
import { SimulationService } from 'src/app/services/simulation.service';
import { PieceJointes } from 'src/app/models/credit/piece-jointes';
import { Demande } from 'src/app/models/credit/demande';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { TypeCredit } from 'src/app/models/credit/type-credit';
import { base64StringToBlob } from 'blob-util';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-form-credit',
  templateUrl: './form-credit.component.html',
  styleUrls: ['./form-credit.component.scss'],
})
export class FormCreditComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  validation_messages = {
    nom: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      {
        type: 'pattern',
        message: 'Le nom ne doit pas contenir de caractères spéciaux.',
      },
    ],
    prenom: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      {
        type: 'pattern',
        message: 'Le prenom ne doit pas contenir de caractères spéciaux.',
      },
    ],
    typePiece: [{ type: 'required', message: 'Ce champ est obligatoire.' }],
    numPiece: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'pattern', message: 'Numéro invalide.' },
      { type: 'maxlength', message: 'Numéro invalide.' },
      { type: 'minlength', message: 'Numéro invalide.' },
    ],
    numCompte: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'pattern', message: 'Numéro de compte invalide.' },
      {
        type: 'minlength',
        message: 'Le numéro de compte doit contenir 13 chiffres.',
      },
    ],
    dateCompte: [{ type: 'required', message: 'Ce champ est obligatoire.' }],
    dateNaissance: [{ type: 'required', message: 'Ce champ est obligatoire.' }],
    sitFamiliale: [{ type: 'required', message: 'Ce champ est obligatoire.' }],
    gsm: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      {
        type: 'pattern',
        message: 'Le numéro de telephone doit contenir que des chiffres.',
      },
      {
        type: 'minlength',
        message: 'Le numéro de telephone doit contenir 8 chiffres.',
      },
    ],
    montant: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      {
        type: 'pattern',
        message: 'Le montant doit contenir que des chiffres.',
      },
    ],
    nbreEcheance: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'pattern', message: 'Ce champ doit contenir que des chiffres' },
      {
        type: 'max',
        message:
          'Le nombre maximales des echeances est : [Par mois: 360, Par an: 30].',
      },
      { type: 'min', message: 'Le nombre minimales des echeances est 1.' },
    ],
    unite: [{ type: 'required', message: 'Ce champ est obligatoire.' }],
    typeCredit: [{ type: 'required', message: 'Ce champ est obligatoire.' }],
    salaire: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'pattern', message: 'Ce champ doit contenir que des chiffres' },
    ],
    garantie: [{ type: 'required', message: 'Ce champ est obligatoire.' }],
    piecesJointes: [
      {
        type: 'required',
        message: 'Veuillez insérer les documents nécessaires.',
      },
    ],
  };

  echeanceOptions = ['Mois', 'An'];

  familialeOptions = ['Marié(e)', 'Célibataire', 'Divorcé(e)', 'Veuf(ve)'];

  pieceOptions = ['CIN', 'Passeport'];

  typesCredit: TypeCredit[];

  demande = {} as Demande;

  date;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  UserId: number;

  demForm: FormGroup;

  multiple: boolean;

  selected = [] as PieceJointes[];

  propagateChange: any;

  propagateValidator: any;

  files = [] as File[];

  requiredDocs = [] as { idDoc: number; libDoc: string }[];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private demandeService: DemandeCreditService,
    private simulationService: SimulationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.multiple = true;
    this.propagateChange = (object: any) => {};
    this.propagateValidator = () => {};
  }

  ngOnInit() {
    this.getUserID();
    this.getTypeCredit();
    this.demForm = this.formBuilder.group(
      {
        nom: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[A-Za-z]+$/),
          ]),
        ],
        prenom: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[A-Za-z]+$/),
          ]),
        ],
        typePiece: ['', Validators.required],
        numPiece: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[A-Za-z0-9]+$/),
          ]),
        ],
        numCompte: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(13),
            Validators.pattern(/^[A-Za-z0-9]+$/),
          ]),
        ],
        dateCompte: ['', Validators.required],
        dateNaissance: ['', Validators.required],
        sitFamiliale: ['', Validators.required],
        gsm: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^[0-9]+$/),
          ]),
        ],
        montant: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
          ]),
        ],
        nbreEcheance: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
          ]),
        ],
        unite: ['', Validators.required],
        typeCredit: ['', Validators.required],
        salaire: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
          ]),
        ],
        garantie: ['', Validators.required],
        piecesJointes: ['', Validators.required],
      },
      { updateOn: 'change' }
    );
    this.controlNumPieceInput();
    this.controlEcheanceInput();
  }

  controlNumPieceInput() {
    this.demForm.get('typePiece').valueChanges.subscribe((value) => {
      if (value === 'CIN') {
        this.demForm.controls.numPiece.setValue(null);
        this.demForm
          .get('numPiece')
          .setValidators(
            Validators.compose([
              Validators.required,
              Validators.maxLength(8),
              Validators.minLength(8),
              Validators.pattern(/^[0-9]+$/),
            ])
          );
      } else if (value === 'Passeport') {
        this.demForm.controls.numPiece.setValue(null);
        this.demForm
          .get('numPiece')
          .setValidators(
            Validators.compose([
              Validators.required,
              Validators.maxLength(9),
              Validators.minLength(9),
              Validators.pattern(/^[A-Za-z0-9]+$/),
            ])
          );
      }
    });
  }
  controlEcheanceInput() {
    this.demForm.get('unite').valueChanges.subscribe((value) => {
      if (value === 'Mois') {
        this.demForm.controls.nbreEcheance.setValue(null);
        this.demForm
          .get('nbreEcheance')
          .setValidators(
            Validators.compose([
              Validators.required,
              Validators.max(360),
              Validators.min(1),
              Validators.pattern(/^[0-9]+$/),
            ])
          );
      } else if (value === 'An') {
        this.demForm.controls.nbreEcheance.setValue(null);
        this.demForm
          .get('nbreEcheance')
          .setValidators(
            Validators.compose([
              Validators.required,
              Validators.max(30),
              Validators.min(1),
              Validators.pattern(/^[0-9]+$/),
            ])
          );
      }
    });
  }

  formatDate(value: string) {
    const date = format(parseISO(value), 'dd/MM/yyyy');
    const dateParts = date.split('/');
    const dateObject = new Date(
      +dateParts[2],
      +dateParts[1] - 1,
      +dateParts[0]
    );
    return dateObject;
  }

  getUserID() {
    this.tokenService.getUser().subscribe((data) => {
      this.UserId = data.id;
    });
  }

  getTypeCredit() {
    this.demandeService.getTypeCreditAPI().subscribe((response) => {
      this.typesCredit = response;
    });
  }

  findDocObligatoire() {
    console.log('test');
    this.demandeService
      .getPieceJointesAPI(this.demForm.value.typeCredit)
      .subscribe((response) => {
        this.requiredDocs = response;
      });
  }

  maxNumPiece() {
    if (this.demForm.value.typePiece === 'CIN') {
      return 8;
    } else if (this.demForm.value.typePiece === 'Passeport') {
      return 9;
    } else {
      return 8;
    }
  }

  onChange(e) {
    this.files = e.target.files;
  }

  public onUpload(): void {
    if (this.files.length > 0) {
      let total = this.files.length;
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < this.files.length; i++) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.files[i]);
        fileReader.onloadend = () => {
          const data = fileReader.result.toString().split(';');
          const document = {} as PieceJointes;
          if (fileReader.result === 'data:') {
            document.fileContent = '';
            document.fileName = this.files[i].name;
            document.fileType = '';
          } else {
            document.fileContent = data[1].split(',')[1];
            document.fileName = this.files[i].name;
            document.fileType = data[0].split(':')[1];
          }
          if (this.multiple) {
            if (!this.selected) {
              this.selected = [];
            }
            if (
              this.selected.filter((doc) => doc.fileName === document.fileName)
                .length === 0
            ) {
              this.selected.push(document);
            }
          } else {
            if (
              !this.selected ||
              this.selected.filter((doc) => doc.fileName === document.fileName)
                .length === 0
            ) {
              this.selected = [];
              this.selected.push(document);
            }
          }

          total -= 1;
          if (total === 0) {
            this.propagateChange(this.selected);
          }
          this.demande.pieces = this.selected;
        };
      }
    }
  }

  public onDownload(pj: PieceJointes): void {
    if (pj.fileContent) {
      saveAs(base64StringToBlob(pj.fileContent, pj.fileType), pj.fileName, {
        autoBOM: true,
      });
    }
  }

  public onDelete(pj: PieceJointes): void {
    const index = this.selected.indexOf(pj);
    if (index !== -1) {
      this.selected.splice(index, 1);
    }
    this.propagateChange(this.selected);
  }

  submit() {}
}
