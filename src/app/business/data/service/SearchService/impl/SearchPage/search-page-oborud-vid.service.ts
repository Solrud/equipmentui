import {Inject, Injectable, InjectionToken} from '@angular/core';
import {OBORUD_EKZ_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ASearchPageService} from "../../asearch-page.service";
import {OborudVidSearchDTO} from "../../../../model/search/impl/OborudVidSearchDTO";
import {OborudVidDTO} from "../../../../model/dto/impl/OborudVid";

@Injectable({
  providedIn: 'root'
})
export class SearchPageOborudVidService extends ASearchPageService<OborudVidDTO, OborudVidSearchDTO>{
  constructor(@Inject(OBORUD_EKZ_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
