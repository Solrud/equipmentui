import {Inject, Injectable, InjectionToken} from '@angular/core';
import {UCH_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {UchDTO} from "../../../../model/dto/impl/UchDTO";
import {ASearchAllService} from "../../asearch-all.service";

@Injectable({
  providedIn: 'root'
})
export class SearchAllUchService extends ASearchAllService<UchDTO>{
  constructor(@Inject(UCH_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
