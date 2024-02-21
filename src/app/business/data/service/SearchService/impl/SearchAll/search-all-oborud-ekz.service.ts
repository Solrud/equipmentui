import {Inject, Injectable, InjectionToken} from '@angular/core';
import {OBORUD_EKZ_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {OborudEkzDTO} from "../../../../model/dto/impl/OborudEkzDTO";
import {ASearchAllService} from "../../asearch-all.service";

@Injectable({
  providedIn: 'root'
})
export class SearchAllOborudEkzService extends ASearchAllService<OborudEkzDTO>{
  constructor(@Inject(OBORUD_EKZ_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
