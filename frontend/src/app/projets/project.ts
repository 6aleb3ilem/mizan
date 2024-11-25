import { BCT } from "../bct/bct";
import { Client } from "../client/client";
import { Situation } from "../situation/situation";
import { Status } from "../status/status";

export interface Project {
  projectId: number| null;
  creationDate: string;
  projectMO: string;
  projectMOE: string;
  projectBCT: BCT;
  projectLocation: string;
  title: string;
  refProjet:string;
  annee:string;
  client: Client;
  clientId:number;
  status:Status ;
  situation:Situation;
}