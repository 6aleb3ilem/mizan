import { Priorite } from "../priorite/priorite";
import { Project } from "../projets/project";
import { Status } from "../status/status";

export interface Tache {
    taskId: number;
    taskName: string;
    start: string;
    deadline: string;
    priority: Priorite;
    status: Status;
    note: string;
    project: Project; // Change the type to number to store the ID of the project
    refTask:string;
    montant:number;
    totalTask:number;

}