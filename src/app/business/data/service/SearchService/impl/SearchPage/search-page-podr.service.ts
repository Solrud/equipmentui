import {Inject, Injectable, InjectionToken} from '@angular/core';
import {PODR_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {PodrDTO} from "../../../../model/dto/impl/PodrDTO";
import {PodrSearchDTO} from "../../../../model/search/impl/PodrSearchDTO";
import {ASearchPageService} from "../../asearch-page.service";

@Injectable({
  providedIn: 'root'
})
export class SearchPagePodrService extends ASearchPageService<PodrDTO, PodrSearchDTO>{
  constructor(@Inject(PODR_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
