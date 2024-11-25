// contact.ts
import { Profession } from "../profession/profession";
import { Client } from "./client";
export interface Contact {
    id: number;
    name: string;
    telephone: string;
    email: string;
    address: string;
    profession: Profession;
    note: string;
    clients: Client[]; 
}
