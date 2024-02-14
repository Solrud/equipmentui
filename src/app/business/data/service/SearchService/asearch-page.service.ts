import {Injectable, InjectionToken} from '@angular/core';
import {IBaseDTO} from '../../model/dto/IBaseDTO';
import {ABaseService} from '../abase.service';
import {HttpClient} from '@angular/common/http';
import {ISearchPageService} from './isearch-page.service';
import {Observable} from 'rxjs';
import {IBaseSearchDTO} from "../../model/search/IBaseSearchDTO";

@Injectable({
  providedIn: 'root'
})
export abstract class ASearchPageService<D extends IBaseDTO, S extends IBaseSearchDTO> extends ABaseService implements ISearchPageService<D, S> {

  protected constructor(baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }

  searchPage(s: S): Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + '/search', s);
  }
}
