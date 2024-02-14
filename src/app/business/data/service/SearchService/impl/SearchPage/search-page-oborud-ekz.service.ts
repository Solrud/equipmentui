import {Inject, Injectable, InjectionToken} from '@angular/core';
import {OBORUD_EKZ_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {OborudEkzDTO} from "../../../../model/dto/impl/OborudEkzDTO";
import {OborudEkzSearchDTO} from "../../../../model/search/impl/OborudEkzSearchDTO";
import {ASearchPageService} from "../../asearch-page.service";

@Injectable({
  providedIn: 'root'
})
export class SearchPageOborudEkzService extends ASearchPageService<OborudEkzDTO, OborudEkzSearchDTO>{
  constructor(@Inject(OBORUD_EKZ_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
