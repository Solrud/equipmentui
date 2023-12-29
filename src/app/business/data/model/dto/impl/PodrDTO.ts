import {ABaseDTO} from "../ABaseDTO";

export class PodrDTO extends ABaseDTO{
  parent: PodrDTO;
  kod: string;
  obozn: string;
  naim: string;
}
