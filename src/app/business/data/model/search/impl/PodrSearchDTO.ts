import {ABaseSearchDTO} from "../ABaseSearchDTO";

export class PodrSearchDTO extends ABaseSearchDTO{
  id: number;
  parentId: number;
  kod: string;
  obozn: string;
  naim: string;
}
