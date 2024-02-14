import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ASearchListService} from "../../asearch-list.service";
import {GruppaDTO} from "../../../../model/dto/impl/GruppaDTO";
import {GruppaSearchDTO} from "../../../../model/search/impl/GruppaSearchDTO";
import {GRUPPA_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchListGruppaService extends ASearchListService<GruppaDTO>{
  constructor(@Inject(GRUPPA_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
