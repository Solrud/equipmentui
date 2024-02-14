import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ASearchListService} from "../../asearch-list.service";
import {OBORUD_EKZ_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {OborudEkzDTO} from "../../../../model/dto/impl/OborudEkzDTO";
import {OborudEkzSearchDTO} from "../../../../model/search/impl/OborudEkzSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchListOborudEkzService extends ASearchListService<OborudEkzDTO>{
  constructor(@Inject(OBORUD_EKZ_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
