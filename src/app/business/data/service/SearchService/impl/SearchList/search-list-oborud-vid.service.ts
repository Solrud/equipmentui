import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ASearchListService} from "../../asearch-list.service";
import {OBORUD_EKZ_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {OborudEkzDTO} from "../../../../model/dto/impl/OborudEkzDTO";
import {OborudEkzSearchDTO} from "../../../../model/search/impl/OborudEkzSearchDTO";
import {OborudVidDTO} from "../../../../model/dto/impl/OborudVid";

@Injectable({
  providedIn: 'root'
})
export class SearchListOborudVidService extends ASearchListService<OborudVidDTO>{
  constructor(@Inject(OBORUD_EKZ_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
