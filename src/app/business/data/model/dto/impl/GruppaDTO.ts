import {ModelDTO} from "./ModelDTO";
import {OborudDTO} from "../OborudDTO";
import {OborudVidDTO} from "./OborudVid";
import {OborudKlassDTO} from "./OborudKlassDTO";
import {NalPuDTO} from "./NalPuDTO";
import {GabZoDTO} from "./GabZoDTO";

export class GruppaDTO extends OborudDTO{
  kodKlass: string;
  klass: OborudKlassDTO;
  vid: OborudVidDTO;
  nalPu: NalPuDTO;
  gabZo: GabZoDTO;
  rod: GruppaDTO;
  modely: ModelDTO[] = [];
}
