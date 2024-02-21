import {Inject, Injectable, InjectionToken} from '@angular/core';
import {PODR_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {PodrDTO} from "../../../../model/dto/impl/PodrDTO";
import {ASearchAllService} from "../../asearch-all.service";

@Injectable({
  providedIn: 'root'
})
export class SearchAllPodrService extends ASearchAllService<PodrDTO>{
  constructor(@Inject(PODR_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
