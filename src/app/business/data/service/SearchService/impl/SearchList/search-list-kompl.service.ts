import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ASearchListService} from "../../asearch-list.service";
import {KOMPL_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {KomplDTO} from "../../../../model/dto/impl/KomplDTO";
import {KomplSearchDTO} from "../../../../model/search/impl/KomplSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchListKomplService extends ASearchListService<KomplDTO> {
  constructor(@Inject(KOMPL_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
