import { Project } from "./project";
import { Status } from "../status/status";
import { Tache } from "../tache/tache";
// contact.ts
export interface Devis {
    discount: number;
    date: string;
    devisId: number;
    note: string;
    status: Status;
    project:Project;
    discountp:number;
    tache:Tache;
    tva?:number;
    tva_present?: boolean; // This corresponds to the tva_present column in your backend.
    ref_devis:string;
    annee:string;
    creationDate:string;

    montant:number;
    montantTva:number;
    montantRemise:number;
    mp1:string;
    mp2:string;
    mp3:string;
    mp4:string;
    mp5:string;
    pmp1:string;
    pmp2:string;
    pmp3:string;
    pmp4:string;
    pmp5:string;
    remiserapport:string;
    datedemarage:string;
}
