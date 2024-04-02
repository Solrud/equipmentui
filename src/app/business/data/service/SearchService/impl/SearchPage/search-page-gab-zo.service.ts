import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GAB_ZO_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ASearchPageService} from "../../asearch-page.service";
import {GabZoDTO} from "../../../../model/dto/impl/GabZoDTO";
import {GabZoSearchDTO} from "../../../../model/search/impl/GabZoSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchPageGabZoService extends ASearchPageService<GabZoDTO, GabZoSearchDTO>{
  constructor(@Inject(GAB_ZO_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
