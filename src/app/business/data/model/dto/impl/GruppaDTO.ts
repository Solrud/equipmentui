import {ABaseDTO} from "../ABaseDTO";
import {ModelDTO} from "./ModelDTO";
import {OborudDTO} from "../OborudDTO";

export class GruppaDTO extends OborudDTO{
  kodKlass: string;
  modely: ModelDTO[] = [];
}
