import {Inject, Injectable, InjectionToken} from '@angular/core';
import {OBORUD_VID_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ASearchAllService} from "../../asearch-all.service";
import {OborudVidDTO} from "../../../../model/dto/impl/OborudVid";

@Injectable({
  providedIn: 'root'
})
export class SearchAllOborudVidService extends ASearchAllService<OborudVidDTO>{
  constructor(@Inject(OBORUD_VID_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
