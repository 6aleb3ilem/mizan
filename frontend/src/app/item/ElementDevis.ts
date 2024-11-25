import { ListeDePrix } from './../Liste-prix/listeprix';
import { Element } from './element';
import { listeDePrix } from './listeprix';
//Item.ts
import { Tache } from './tache';
export interface ElementDevis {
    id: number;
    elementNote: string;
    elementQty: number;
    elementStatus: string;
element:Element;
}
