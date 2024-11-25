//client.ts
import { Contact } from "./contact";
export interface Client {
    id: number;
  name: string;
  telephone: string;
  email: string;
  address: string;
  status: string;
  note: string;
  contacts: Contact[]; 

}
