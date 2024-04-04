import {ABaseDTO} from "../ABaseDTO";
import {OborudKlassDTO} from "./OborudKlassDTO";

export class OborudVidDTO extends ABaseDTO{
  naim: string;
  kodKlass: string;
  klass: OborudKlassDTO;
}
