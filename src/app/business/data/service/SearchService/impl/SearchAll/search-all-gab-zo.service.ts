import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GAB_ZO_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ASearchAllService} from "../../asearch-all.service";
import {GabZoDTO} from "../../../../model/dto/impl/GabZoDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchAllGabZoService extends ASearchAllService<GabZoDTO>{
  constructor(@Inject(GAB_ZO_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
