import {Inject, Injectable, InjectionToken} from '@angular/core';
import {OBORUD_KLASS_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ASearchAllService} from "../../asearch-all.service";
import {OborudKlassDTO} from "../../../../model/dto/impl/OborudKlassDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchAllOborudKlassService extends ASearchAllService<OborudKlassDTO>{
  constructor(@Inject(OBORUD_KLASS_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
