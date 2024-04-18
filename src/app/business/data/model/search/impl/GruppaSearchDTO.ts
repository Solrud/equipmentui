import {ABaseSearchDTO} from "../ABaseSearchDTO";

export class GruppaSearchDTO extends ABaseSearchDTO{
  id: number;
  rodId: number;
  kod: string;
  kodKlass: string;
  naim: string;
  akt: number;
}
