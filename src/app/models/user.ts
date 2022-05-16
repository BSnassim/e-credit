import { Agence } from './credit/agence';
import { Profil } from './profil';

export class User {
  id?: number;
  nom: string;
  prenom: string;
  password: string;
  email: string;
  tel: number;
  dateNais: Date;
  profil: Profil;
  agence: Agence;
}
