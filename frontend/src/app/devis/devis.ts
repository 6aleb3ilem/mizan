import { Status } from "../status/status";
// contact.ts
export interface Devis {
    discount: number;
    date: string;
    devisId: number;
    note: string;
    status: Status;
    discountp:number;
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
    projectId?: number;
    projectName?: string; // Ajout temporaire
    clientName?: string;  // Ajout temporaire
}
