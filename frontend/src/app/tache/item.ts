//Item.ts
import { Big } from 'big.js';
export interface Item {
    id: number;
    elementNote: string;
    elementQty: Big;
    elementStatus: string;
    task: number;
}
