import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ASearchListService} from "../../asearch-list.service";
import {PROIZV_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ProizvDTO} from "../../../../model/dto/impl/ProizvDTO";
import {ProizvSearchDTO} from "../../../../model/search/impl/ProizvSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchListProizvService extends ASearchListService<ProizvDTO>{
  constructor(@Inject(PROIZV_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
