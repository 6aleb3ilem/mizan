// clientcontact.ts
import { Client } from '../client/client';
import { Contact } from '../contact/contact'; // Assurez-vous que le chemin d'importation est correct

export interface Clientcontact {
    id: number;
    contact: Contact;
    client: Client;
    isPrincipal: Boolean;
  }
  