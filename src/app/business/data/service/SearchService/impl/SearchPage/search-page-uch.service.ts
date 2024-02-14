import {Inject, Injectable, InjectionToken} from '@angular/core';
import {UCH_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {UchDTO} from "../../../../model/dto/impl/UchDTO";
import {UchSearchDTO} from "../../../../model/search/impl/UchSearchDTO";
import {ASearchPageService} from "../../asearch-page.service";

@Injectable({
  providedIn: 'root'
})
export class SearchPageUchService extends ASearchPageService<UchDTO, UchSearchDTO>{
  constructor(@Inject(UCH_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
