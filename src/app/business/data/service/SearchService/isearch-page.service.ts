import {Observable} from 'rxjs';
import {IBaseDTO} from '../../model/dto/IBaseDTO';
import {IBaseSearchDTO} from "../../model/search/IBaseSearchDTO";

export interface ISearchPageService<D extends IBaseDTO, S extends IBaseSearchDTO> {
  searchPage(s: S): Observable<any>;
}
