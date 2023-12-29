import {ABaseDTO} from "../ABaseDTO";
import {OborudEkzDTO} from "./OborudEkzDTO";
import {OborudDTO} from "../OborudDTO";

export class ModelDTO extends OborudDTO{
  obozn: string;
  ekzemplary: OborudEkzDTO[] = [];
}
