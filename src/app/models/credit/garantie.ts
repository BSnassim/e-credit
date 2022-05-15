import { NatureGarantie } from './nature-garantie';
import { TypeGarantie } from './type-garantie';

export class Garantie {
  id?: string;
  nature?: NatureGarantie;
  type?: TypeGarantie;
  montant?: number;
}
