import {Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IBaseDTO} from '../../model/dto/IBaseDTO';
import {ABaseService} from '../abase.service';
import {ISearchListService} from './isearch-list.service';
import {Observable} from 'rxjs';
import {IBaseSearchDTO} from "../../model/search/IBaseSearchDTO";

@Injectable({
  providedIn: 'root'
})
export abstract class ASearchListService<D extends IBaseDTO> extends ABaseService implements ISearchListService<D> {

  protected constructor(baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }

  searchList(): Observable<D[]> {
    return this.httpClient.get<D[]>(this.baseUrl + '/find-all');
  }

}
