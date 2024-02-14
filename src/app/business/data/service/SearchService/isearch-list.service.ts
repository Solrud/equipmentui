import {Observable} from 'rxjs';
import {IBaseDTO} from '../../model/dto/IBaseDTO';

export interface ISearchListService<D extends IBaseDTO> {
  searchList(): Observable<D[]>;
}
