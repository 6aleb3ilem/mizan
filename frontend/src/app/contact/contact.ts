// contact.ts
import { Profession } from "../profession/profession";
import { Client } from "../client/client";
export interface Contact {
    id: number;
    address: string;
    email: string;
    name: string;
    note: string;
    telephone: string;
    whatsapp: string; // Ajout du numéro WhatsApp
    profession: Profession;

    clients: Client[]; 
}
