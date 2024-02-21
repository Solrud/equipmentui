import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GruppaDTO} from "../../../../model/dto/impl/GruppaDTO";
import {GRUPPA_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ASearchAllService} from "../../asearch-all.service";

@Injectable({
  providedIn: 'root'
})
export class SearchAllGruppaService extends ASearchAllService<GruppaDTO>{
  constructor(@Inject(GRUPPA_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
