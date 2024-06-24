import {ABaseSearchDTO} from "../ABaseSearchDTO";

export class OborudEkzSearchDTO extends ABaseSearchDTO{
  id: number;
  modelId: number;
  podrId: number;
  podrObozn: string;
  podrNaim: string;
  uchId: number;
  uchObozn: string;
  uchNaim: string;
  serNom: string;
  invNom: string;
  naim: string;
  akt: number;
}
