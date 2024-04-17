import {ABaseDTO} from "../ABaseDTO";
import {ProizvDTO} from "./ProizvDTO";
import {PodrDTO} from "./PodrDTO";
import {UchDTO} from "./UchDTO";
import {ModelDTO} from "./ModelDTO";

export class OborudEkzDTO extends ABaseDTO{
  model: ModelDTO;
  serNom: string;
  invNom: string;
  naim: string;
  proizv: ProizvDTO;
  podr: PodrDTO;
  uch: UchDTO;
  akt: number;
  prim: string; // 250 макс
}
