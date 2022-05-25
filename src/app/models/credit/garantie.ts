import { NatureGarantie } from './nature-garantie';
import { TypeGarantie } from './type-garantie';

export class Garantie {
  idGarantieDde?: number;
  idNatureGarantie?: number;
  idTypeGrt?: number;
  nature?: NatureGarantie;
  type?: TypeGarantie;
  montant?: number;
}
