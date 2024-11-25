//Projet.ts
import { Client } from "./client";
import { Tache } from "./tache";
export interface Projet {
    projetId: number;
    name: string;
    title: string;
    project_MO: string;
    project_MOE: string;
    project_bct: string;
    project_localisation: string;
    date_de_creation: Date;
    refProjet:string;
    tasks: Tache[]; 
    client:Client
}

