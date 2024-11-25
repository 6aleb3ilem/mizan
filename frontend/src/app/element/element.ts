// Element.ts dans le frontend
import { Type } from '../type/type';
import { Item } from '../item/item'; // Assurez-vous que le chemin d'importation est correct

export interface Element {
    id: number; 
    name: string; 
    note: string;
    type: Type | null;
    elementDevis?: Item[]; // Ajout pour refléter la relation OneToMany avec ElementDevis
}