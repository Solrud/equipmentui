import {ModelDTO} from "./ModelDTO";
import {OborudDTO} from "../OborudDTO";
import {OborudVidDTO} from "./OborudVid";

export class GruppaDTO extends OborudDTO{
  kodKlass: string;
  modely: ModelDTO[] = [];
  rod: GruppaDTO;
  vid: OborudVidDTO;
}
