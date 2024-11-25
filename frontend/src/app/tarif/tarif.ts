//tarif.ts
import { Unite } from '../unite/unite';
import { Element } from '../element/element'; // Assurez-vous que le chemin d'importation est correct

export interface Tarif {
    id: number;
    unite: Unite;
    element: Element;
    pritunit: number;
    principal: Boolean;
  }
  