// conditiondevis.ts
import { Devis } from '../devis/devis';
import { conditionP } from '../condition-p/conditionP'; // Assurez-vous que le chemin d'importation est correct
import { Devisf } from '../devisf/devisf';

export interface Conditiondevis {
    id: number;
    conditionp: conditionP;
    devis: Devisf;
  }
  