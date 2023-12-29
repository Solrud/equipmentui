import {IBaseSearchDTO} from "./IBaseSearchDTO";

export abstract class ABaseSearchDTO implements IBaseSearchDTO{
  pageNumber: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: string;
}
