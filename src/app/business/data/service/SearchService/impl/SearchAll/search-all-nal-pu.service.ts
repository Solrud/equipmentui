import {Inject, Injectable, InjectionToken} from '@angular/core';
import {NAL_PU_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ASearchAllService} from "../../asearch-all.service";
import {NalPuDTO} from "../../../../model/dto/impl/NalPuDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchAllNalPuService extends ASearchAllService<NalPuDTO> {
  constructor(@Inject(NAL_PU_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
