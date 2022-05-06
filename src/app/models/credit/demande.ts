import { Garantie } from "./garantie";
import { PieceJointes } from "src/app/models/credit/piece-jointes";

export class Demande {
    idDemande?: number;
    nom?: string;
    prenom?: string;
    dateNaissance?: Date;
    numPiece?: string;
    sitFamiliale?: string;
    typePiece?: string;
    numCompte?: string;
    dateCompte?: Date;
    nbreEcheance?: number;
    montant?: number;
    unite?: string;
    datePhase?: Date;
    idPhase?: number;
    idTypeCredit?: number;
    complement?: string;
    garantie?: Garantie[];
    pieces?: PieceJointes[];
    idUser?: number;
    userName?: string;
    gsm?: number;
    idSimulation?: number;
}