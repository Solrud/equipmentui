import { Injectable } from '@angular/core';
import {IBaseDTO} from "../../model/dto/IBaseDTO";
import {ICRUDService} from "./icrud.service";
import {ABaseService} from "../abase.service";

@Injectable({
  providedIn: 'root'
})
export abstract class ACRUDService<D extends IBaseDTO> extends ABaseService implements ICRUDService<D>{

  constructor() { }
}
