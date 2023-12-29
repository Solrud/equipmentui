import {ABaseDTO} from "../ABaseDTO";
import {ProizvDTO} from "./ProizvDTO";
import {PodrDTO} from "./PodrDTO";
import {UchDTO} from "./UchDTO";
import {GruppaDTO} from "./GruppaDTO";

export class OborudEkzDTO extends ABaseDTO{
  model: GruppaDTO;
  serNom: string;
  invNum: string;
  naim: string;
  proizv: ProizvDTO;
  podr: PodrDTO;
  uch: UchDTO;
}
