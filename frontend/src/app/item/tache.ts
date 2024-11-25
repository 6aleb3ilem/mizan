import { Priorite } from "../priorite/priorite";
import { Status } from "../status/status";

export interface Tache {
    taskId: number;
    name: string;
    start: string;
    deadline: string;
    priority: Priorite;
    status: Status;
    note: string;
}
