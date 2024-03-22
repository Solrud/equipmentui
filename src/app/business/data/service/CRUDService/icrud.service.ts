import {Observable} from "rxjs";
import {IBaseDTO} from "../../model/dto/IBaseDTO";

export interface ICRUDService<D extends IBaseDTO>{
  createList(d: D): Observable<boolean>;
  read(id: number): Observable<D>;
  updateList(d: D): Observable<D>;
  create(d: D): Observable<D>;
  update(d: D): Observable<D>;
  delete(id: number): Observable<D>;
}
