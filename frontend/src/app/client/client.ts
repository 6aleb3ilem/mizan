//client.ts
import { Status } from "../status/status";
import { Contact } from "./contact";
export interface Client {
    id: number;
  name: string;
  telephone: string;
  email: string;
  address: string;
  status: Status;
  note: string;
  contacts: Contact[]; 

}
