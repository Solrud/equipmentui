import {Inject, Injectable, InjectionToken} from '@angular/core';
import {PROIZV_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ProizvDTO} from "../../../../model/dto/impl/ProizvDTO";
import {ProizvSearchDTO} from "../../../../model/search/impl/ProizvSearchDTO";
import {ASearchPageService} from "../../asearch-page.service";

@Injectable({
  providedIn: 'root'
})
export class SearchPageProizvService extends ASearchPageService<ProizvDTO, ProizvSearchDTO>{
  constructor(@Inject(PROIZV_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
