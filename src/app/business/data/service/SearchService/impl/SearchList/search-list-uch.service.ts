import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ASearchListService} from "../../asearch-list.service";
import {UCH_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {UchDTO} from "../../../../model/dto/impl/UchDTO";
import {UchSearchDTO} from "../../../../model/search/impl/UchSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchListUchService extends ASearchListService<UchDTO>{
  constructor(@Inject(UCH_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
