import {Inject, Injectable, InjectionToken} from '@angular/core';
import {KOMPL_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {KomplDTO} from "../../../../model/dto/impl/KomplDTO";
import {KomplSearchDTO} from "../../../../model/search/impl/KomplSearchDTO";
import {ASearchPageService} from "../../asearch-page.service";

@Injectable({
  providedIn: 'root'
})
export class SearchPageKomplService extends ASearchPageService<KomplDTO, KomplSearchDTO> {
  constructor(@Inject(KOMPL_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
