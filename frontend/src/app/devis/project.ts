import { BCT } from "../bct/bct";
import { Client } from "./client";
import { Situation } from "../situation/situation";
import { Status } from "../status/status";

export interface Project {
  projectId: number| null;
  title: string;
  client: Client;
  clientId:number;
}