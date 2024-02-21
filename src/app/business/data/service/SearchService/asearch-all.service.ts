import {Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IBaseDTO} from '../../model/dto/IBaseDTO';
import {ABaseService} from '../abase.service';
import {ISearchListService} from './isearch-list.service';
import {Observable} from 'rxjs';
import {ISearchAllService} from "./isearch-all.service";

@Injectable({
  providedIn: 'root'
})
export abstract class ASearchAllService<D extends IBaseDTO> extends ABaseService implements ISearchAllService<D> {

  protected constructor(baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }

  searchAll(): Observable<D[]> {
    return this.httpClient.get<D[]>(this.baseUrl + '/find-all');
  }

}
