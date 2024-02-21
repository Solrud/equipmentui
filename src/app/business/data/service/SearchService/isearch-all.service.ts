import {Observable} from 'rxjs';
import {IBaseDTO} from '../../model/dto/IBaseDTO';

export interface ISearchAllService<D extends IBaseDTO> {
  searchAll(): Observable<D[]>;
}
