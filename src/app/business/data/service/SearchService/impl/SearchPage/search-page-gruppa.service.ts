import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GruppaDTO} from "../../../../model/dto/impl/GruppaDTO";
import {GruppaSearchDTO} from "../../../../model/search/impl/GruppaSearchDTO";
import {GRUPPA_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ASearchPageService} from "../../asearch-page.service";

@Injectable({
  providedIn: 'root'
})
export class SearchPageGruppaService extends ASearchPageService<GruppaDTO, GruppaSearchDTO>{
  constructor(@Inject(GRUPPA_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
