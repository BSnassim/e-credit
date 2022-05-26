import { User } from 'src/app/models/user';
import { NatureGarantie } from './../../models/credit/nature-garantie';
import { TypeGarantie } from './../../models/credit/type-garantie';
import { DemandeCreditService } from './../../services/demande-credit.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
import { SimulationService } from 'src/app/services/simulation.service';
import { PieceJointes } from 'src/app/models/credit/piece-jointes';
import { Demande } from 'src/app/models/credit/demande';
import { saveAs } from "file-saver";
import { base64StringToBlob } from "blob-util";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { TypeCredit } from 'src/app/models/credit/type-credit';
import { Garantie } from 'src/app/models/credit/garantie';


@Component({
  selector: 'app-form-credit',
  templateUrl: './form-credit.component.html',
  styleUrls: ['./form-credit.component.scss'],
})
export class FormCreditComponent implements OnInit {

  validation_messages = {
    'nom': [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'pattern', message: 'Le nom ne doit pas contenir de caractères spéciaux.' }
    ],
    'prenom': [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'pattern', message: 'Le prenom ne doit pas contenir de caractères spéciaux.' }
    ],
    'typePiece': [
      { type: 'required', message: 'Ce champ est obligatoire.' }
    ],
    'numPiece': [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'pattern', message: 'Numéro invalide.' },
      { type: 'maxlength', message: 'Numéro invalide.' },
      { type: 'minlength', message: 'Numéro invalide.' }
    ],
    'numCompte': [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'pattern', message: 'Numéro de compte invalide.' },
      { type: 'minlength', message: 'Le numéro de compte doit contenir 13 chiffres.' }
    ],
    'dateCompte': [
      { type: 'required', message: 'Ce champ est obligatoire.' }
    ],
    'dateNaissance': [
      { type: 'required', message: 'Ce champ est obligatoire.' }
    ],
    'sitFamiliale': [
      { type: 'required', message: 'Ce champ est obligatoire.' }
    ],
    'gsm': [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'pattern', message: 'Le numéro de telephone doit contenir que des chiffres.' },
      { type: 'minlength', message: 'Le numéro de telephone doit contenir 8 chiffres.' }
    ],
    'montant': [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'pattern', message: 'Le montant doit contenir que des chiffres.' }
    ],
    'nbreEcheance': [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'pattern', message: 'Ce champ doit contenir que des chiffres' },
      { type: 'max', message: 'Le nombre maximales des echeances est : [Par mois: 360, Par an: 30].' },
      { type: 'min', message: 'Le nombre minimales des echeances est 1.' }
    ],
    'unite': [
      { type: 'required', message: 'Ce champ est obligatoire.' }
    ],
    'idTypeCredit': [
      { type: 'required', message: 'Ce champ est obligatoire.' }
    ],
    'garantie': [
      { type: 'required', message: 'Ce champ est obligatoire.' },
    ],
    'piecesJointes': [
      { type: 'required', message: 'Veuillez insérer les documents nécessaires.' },
    ]
  }

  echeanceOptions = ['Mois', 'An'];

  familialeOptions = ["Marié(e)", "Célibataire", "Divorcé(e)", "Veuf(ve)"];

  pieceOptions = ["CIN", "Passeport"];

  typesCredit: TypeCredit[];

  demande = {} as Demande;

  date;

  User: User;

  demForm: FormGroup;

  garantieForm: FormGroup;

  multiple: boolean;

  selected = [] as PieceJointes[];

  propagateChange: any;

  propagateValidator: any;

  files = [] as File[];

  requiredDocs = [] as { idDoc: number, libDoc: string }[];

  garanties: Garantie[] = [];

  typeGarantie: TypeGarantie[];

  natureGarantie: NatureGarantie[];

  garantieModal = false;

  EditingGarantie = false;

  selectedGarantie: number;

  editingDemande = false;

  viewingDemande = false;

  errors: string;

  phases: any;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private demandeService: DemandeCreditService,
    private simulationService: SimulationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

  ) {
    this.multiple = true;
    this.propagateChange = (object: any) => { };
    this.propagateValidator = () => { };
  }

  ngOnInit() {
    this.garantieForm = this.formBuilder.group(
      {
        idGarantieDde: [''],
        type: ['', Validators.required],
        nature: ['', Validators.required],
        montant: ['', Validators.required]
      },
      { updateOn: 'change' }
    );
    this.demForm = this.formBuilder.group(
      {
        nom: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z]+$/)])],
        prenom: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z]+$/)])],
        typePiece: ['', Validators.required],
        numPiece: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)])],
        numCompte: ['', Validators.compose([Validators.required, Validators.minLength(13), Validators.pattern(/^[A-Za-z0-9]+$/)])],
        dateCompte: ['', Validators.required],
        dateNaissance: ['', Validators.required],
        sitFamiliale: ['', Validators.required],
        gsm: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9]+$/)])],
        montant: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])],
        nbreEcheance: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])],
        unite: ['', Validators.required],
        idTypeCredit: ['', Validators.required],
        piecesJointes: ['', Validators.required],
        idSimulation: [],
        idDemande: [],
        idPhase: [],
        datePhase: [],
        idUser: []
      },
      { updateOn: 'change' }
    );
    this.controlNumPieceInput();
    this.controlEcheanceInput();
    this.getUserID();
    this.getTypeCredit();
    this.getTypeGarantie();
    this.getNatureGarantie();
    this.getParams();
  }

  getParams() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.viewingDemande = true;
        let value: number = + params.id;
        this.getPhases();
        this.getDemande(value);
        this.getGaranties(value);
        this.getPieces(value);
        this.demForm.controls.nom.disable();
        this.demForm.controls.prenom.disable();
        this.demForm.controls.typePiece.disable();
        this.demForm.controls.numPiece.disable();
        this.demForm.controls.numCompte.disable();
        this.demForm.controls.dateCompte.disable();
        this.demForm.controls.dateNaissance.disable();
        this.demForm.controls.sitFamiliale.disable();
        this.demForm.controls.gsm.disable();
        this.demForm.controls.montant.disable();
        this.demForm.controls.nbreEcheance.disable();
        this.demForm.controls.unite.disable();
        this.demForm.controls.idTypeCredit.disable();
        this.demForm.controls.piecesJointes.disable();
      } else if (params.id1) {
        let v: number = + params.id1;
        this.getSim(v);
      } else {
        this.router.navigate(["notfound"]);
      }
    });
  }

  getSim(id: number) {
    this.simulationService.getSimulationById(id).subscribe((data) => {
      if (data == null) {
        this.router.navigate(["notfound"]);
      } else {
        this.demande.nom = data.nom;
        this.demande.prenom = data.prenom;
        this.demande.dateCompte = data.dateCompte;
        this.demande.dateNaissance = data.dateNaissance;
        this.demande.gsm = data.gsm;
        this.demande.numCompte = data.numCompte;
        this.demande.numPiece = data.numPiece;
        this.demande.typePiece = data.typePiece;
        this.demande.sitFamiliale = data.sitFamiliale;
        this.demande.idSimulation = data.idSim;
        this.demForm.controls.idSimulation.setValue(data.idSim);
        this.demForm.controls.nom.setValue(data.nom);
        this.demForm.controls.prenom.setValue(data.prenom);
        this.demForm.controls.dateCompte.setValue(data.dateCompte);
        this.demForm.controls.dateNaissance.setValue(data.dateNaissance);
        this.demForm.controls.gsm.setValue(data.gsm);
        this.demForm.controls.numCompte.setValue(data.numCompte);
        this.demForm.controls.typePiece.setValue(data.typePiece);
        this.demForm.controls.numPiece.setValue(data.numPiece);
        this.demForm.controls.sitFamiliale.setValue(data.sitFamiliale);
      }
    });
  }

  getPhases() {
    this.demandeService.getListPhases().subscribe((data) => {
      this.phases = data;
    });
  }

  getDemande(id: number) {
    this.demandeService.getDemandeById(id).subscribe((data) => {
      if (data == null) {
        this.router.navigate(["notfound"]);
      } else {
        this.demande = data;
        let t = this.typesCredit.find(
          (i) => i.idType === data.idTypeCredit
        );
        this.demande.idTypeCredit = t.idType;
        this.demForm.controls.nom.setValue(data.nom);
        this.demForm.controls.prenom.setValue(data.prenom);
        this.demForm.controls.dateCompte.setValue(data.dateCompte);
        this.demForm.controls.dateNaissance.setValue(data.dateNaissance);
        this.demForm.controls.gsm.setValue(data.gsm);
        this.demForm.controls.numCompte.setValue(data.numCompte);
        this.demForm.controls.typePiece.setValue(data.typePiece);
        this.demForm.controls.numPiece.setValue(data.numPiece);
        this.demForm.controls.sitFamiliale.setValue(data.sitFamiliale);
        this.demForm.controls.idTypeCredit.setValue(data.idTypeCredit);
        this.demForm.controls.montant.setValue(data.montant);
        this.demForm.controls.unite.setValue(data.unite);
        this.demForm.controls.nbreEcheance.setValue(data.nbreEcheance);
        this.demForm.controls.idSimulation.setValue(data.idSimulation);
        this.demForm.controls.idDemande.setValue(data.idDemande);
        this.demForm.controls.idUser.setValue(data.idUser);
        this.demForm.controls.idPhase.setValue(data.idPhase);
        this.demForm.controls.datePhase.setValue(data.datePhase);
        this.demForm.get('piecesJointes').clearValidators();
      }
    });
  }

  getGaranties(id: number) {
    this.demandeService.getGarantiesByDemande(id).subscribe((data) => {
      data.forEach((g) => {
        let garantie = {} as Garantie;
        let n: NatureGarantie = this.natureGarantie.find((n) => n.idNature == g.idNatureGarantie);
        let t: TypeGarantie = this.typeGarantie.find((t) => t.id == g.idTypeGrt);
        garantie.idGarantieDde = g.idGarantieDde;
        garantie.montant = g.montant;
        garantie.nature = n;
        garantie.type = t;
        this.garanties.push(garantie);
      })
    });
  }

  getPieces(id: number) {
    this.demandeService
      .getPieceJointesByDemande(id)
      .subscribe((data) => {
        this.selected = data;
      });
  }

  controlNumPieceInput() {
    this.demForm.get('typePiece').valueChanges.subscribe(value => {
      if (value == "CIN") {
        this.demForm.controls.numPiece.setValue(null);
        this.demForm.get('numPiece').setValidators(Validators.compose([
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8),
          Validators.pattern(/^[0-9]+$/)
        ]))
      } else if (value == "Passeport") {
        this.demForm.controls.numPiece.setValue(null);
        this.demForm.get('numPiece').setValidators(Validators.compose([
          Validators.required,
          Validators.maxLength(9),
          Validators.minLength(9),
          Validators.pattern(/^[A-Za-z0-9]+$/)
        ]))
      }
    });
  }
  controlEcheanceInput() {
    this.demForm.get('unite').valueChanges.subscribe(value => {
      if (value == "Mois") {
        this.demForm.controls.nbreEcheance.setValue(null);
        this.demForm.get('nbreEcheance').setValidators(Validators.compose([
          Validators.required,
          Validators.max(360),
          Validators.min(1),
          Validators.pattern(/^[0-9]+$/)
        ]))
      } else if (value == "An") {
        this.demForm.controls.nbreEcheance.setValue(null);
        this.demForm.get('nbreEcheance').setValidators(Validators.compose([
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
        this.User = data;
      }
    )
  }

  getTypeCredit() {
    this.demandeService.getTypeCreditAPI().subscribe((response) => {
      this.typesCredit = response;
    });
  }

  getTypeGarantie() {
    this.demandeService.getTypeGarantieAPI().subscribe((response) => {
      this.typeGarantie = response;
    });
  }

  getNatureGarantie() {
    this.demandeService.getNatureGarantieAPI().subscribe((response) => {
      this.natureGarantie = response;
    });
  }

  addGarantie() {
    let g: Garantie = { ...this.garantieForm.value };
    if (!this.EditingGarantie) {
      this.garanties.push(g);
      this.garantieModal = false;
    } else {
      this.garanties[this.selectedGarantie] = g;
      this.garantieModal = false;
    }
  }

  openModal() {
    this.garantieForm.reset();
    this.garantieModal = true;
    this.EditingGarantie = false;
  }

  editGarantie(i: number) {
    this.selectedGarantie = i;
    this.garantieForm.setValue(this.garanties[i]);
    this.garantieModal = true;
    this.EditingGarantie = true;
  }

  deleteGarantie(i: number) {
    this.garanties.splice(i, 1);
  }

  findDocObligatoire() {
    if (this.demForm.getRawValue().idTypeCredit) {
      this.demandeService
        .getPieceJointesAPI(this.demForm.getRawValue().idTypeCredit)
        .subscribe((response) => {
          this.requiredDocs = response;
        });
    }
  }

  maxNumPiece() {
    if (this.demForm.value.typePiece == "CIN") {
      return 8;
    } else if (this.demForm.value.typePiece == "Passeport") {
      return 9;
    } else return 8;
  }

  onChange(e) {
    this.files = e.target.files;
  }

  public onUpload(): void {
    if (this.files.length > 0) {
      let total = this.files.length;
      for (let i = 0; i < this.files.length; i++) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.files[i]);
        fileReader.onloadend = () => {
          const data = fileReader.result.toString().split(";");
          let document = {} as PieceJointes;
          if (fileReader.result === "data:") {
            document.fileContent = "";
            document.fileName = this.files[i].name;
            document.fileType = "";
          } else {
            document.fileContent = data[1].split(",")[1];
            document.fileName = this.files[i].name;
            document.fileType = data[0].split(":")[1];
          }
          if (this.multiple) {
            if (!this.selected) this.selected = [];
            if (
              this.selected.filter(
                (doc) => doc.fileName === document.fileName
              ).length === 0
            )
              this.selected.push(document);
          } else {
            if (
              !this.selected ||
              this.selected.filter(
                (doc) => doc.fileName === document.fileName
              ).length === 0
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
      };
    }
  }

  public onDownload(pj: PieceJointes): void {
    if (pj.fileContent) {
      saveAs(
        base64StringToBlob(pj.fileContent, pj.fileType),
        pj.fileName,
        { autoBOM: true }
      );
    }
  }

  public onDelete(pj: PieceJointes): void {
    let index = this.selected.indexOf(pj);
    if (index != -1) this.selected.splice(index, 1);
    this.propagateChange(this.selected);
  }

  dismissModal() {
    this.garantieModal = false;
  }

  validateDemForm() {
    let a = true;
    if (this.selected.length == this.requiredDocs.length && this.garanties.length > 0 && this.demForm.valid) {
      a = false;
    }
    return a;
  }

  modifyDemande() {
    this.editingDemande = true;
    this.demForm.controls.montant.enable();
    this.demForm.controls.piecesJointes.enable();
    this.findDocObligatoire();
  }

  submit() {
    let d: Demande = { ...this.demForm.getRawValue() };
    if (!this.editingDemande) {
      this.demande = d;
      this.demande.garantie = this.garanties;
      this.demande.idUser = this.User.id;
      this.demande.changerId = this.User.id;
      this.demande.pieces = this.selected;
      this.demandeService.getDemandeExistsAPI(this.demande.numPiece).subscribe(response => {
        if (response) {
          this.errors = "Vous avez déja déposer une demande";
        } else {
          this.demandeService.postDemandeAPI(this.demande, this.garanties).subscribe();
          this.router.navigate(['/credit/mescredits']);
        }
      })
    } else {
      this.demande = d;
      this.demande.pieces = this.selected;
      this.demande.garantie = this.garanties;
      this.demande.idPhase = 5;
      this.demande.changerId = this.User.id;
      this.demandeService.putDemande(this.demande).subscribe();
      this.router.navigate(['/credit/mescredits']);
      window.location.reload();
    }
  }

}
