import {ABaseDTO} from "../ABaseDTO";
import {OborudKlassDTO} from "./OborudKlassDTO";

export class OborudVidDTO extends ABaseDTO{
  naim: string;
  kodklass: string;
  klass: OborudKlassDTO;
}
