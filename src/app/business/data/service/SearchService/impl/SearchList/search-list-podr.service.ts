import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ASearchListService} from "../../asearch-list.service";
import {PODR_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {PodrDTO} from "../../../../model/dto/impl/PodrDTO";
import {PodrSearchDTO} from "../../../../model/search/impl/PodrSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchListPodrService extends ASearchListService<PodrDTO>{
  constructor(@Inject(PODR_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
