//elementdevis.ts
import { Tache } from './tache';
import { Element } from './element';
import { Status } from '../status/status';
export interface Item {
    id: number;
    elementNote: string;
    name: string;
    elementQty: number;
    status: Status;
    taskid:number
    refEdevis:string;
    element:Element;
    elementid:number;
    prix_unitaire:number;
    montant:number;
    unite:string;
    type:string,
    qteLots:string,
    nbreLots:number
}
