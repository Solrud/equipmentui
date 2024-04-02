import {Inject, Injectable, InjectionToken} from '@angular/core';
import {NAL_PU_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ASearchPageService} from "../../asearch-page.service";
import {NalPuDTO} from "../../../../model/dto/impl/NalPuDTO";
import {NalPuSearchDTO} from "../../../../model/search/impl/NalPuSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchPageNalPuService extends ASearchPageService<NalPuDTO, NalPuSearchDTO> {
  constructor(@Inject(NAL_PU_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
