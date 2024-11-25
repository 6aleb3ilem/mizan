// Element.ts dans le frontend
import { Item } from '../item/item'; // Assurez-vous que le chemin d'importation est correct
import { Type } from './type';
export interface Element {
    id: number; 
    name: string; 
    note: string;
    type: Type ;
    // Ajout pour refléter la relation OneToMany avec ElementDevis
}