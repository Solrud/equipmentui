import {ABaseDTO} from "../ABaseDTO";
import {PodrDTO} from "./PodrDTO";

export class UchDTO extends ABaseDTO{
  kod: string;
  obozn: string;
  naim: string;
  podr: PodrDTO;
}
