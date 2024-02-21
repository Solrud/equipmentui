import {Inject, Injectable, InjectionToken} from '@angular/core';
import {KOMPL_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {KomplDTO} from "../../../../model/dto/impl/KomplDTO";
import {ASearchAllService} from "../../asearch-all.service";

@Injectable({
  providedIn: 'root'
})
export class SearchAllKomplService extends ASearchAllService<KomplDTO> {
  constructor(@Inject(KOMPL_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
