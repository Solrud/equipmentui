import {IBaseSearchDTO} from "./IBaseSearchDTO";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_COLUMN,
  DEFAULT_SORT_DIRECTION
} from "../../../../app.constant";

export abstract class ABaseSearchDTO implements IBaseSearchDTO{
  pageNumber: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;
  sortColumn: string = DEFAULT_SORT_COLUMN;
  sortDirection: string = DEFAULT_SORT_DIRECTION;
}
