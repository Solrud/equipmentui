import {Observable} from "rxjs";
import {IBaseDTO} from "../../model/dto/IBaseDTO";

export interface ICRUDService<D extends IBaseDTO>{
  create(d: D): Observable<boolean>;
  read(id: number): Observable<D>;
  update(d: D): Observable<D>;
  delete(d: D): Observable<D>;
}
