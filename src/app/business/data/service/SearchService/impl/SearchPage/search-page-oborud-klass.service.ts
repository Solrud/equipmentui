import {Inject, Injectable, InjectionToken} from '@angular/core';
import {OBORUD_KLASS_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ASearchPageService} from "../../asearch-page.service";
import {OborudKlassSearchDTO} from 'src/app/business/data/model/search/impl/OborudKlassSearchDTO';
import {OborudKlassDTO} from "../../../../model/dto/impl/OborudKlassDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchPageOborudKlassService extends ASearchPageService<OborudKlassDTO, OborudKlassSearchDTO>{
  constructor(@Inject(OBORUD_KLASS_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
