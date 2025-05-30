import {Inject, Injectable, InjectionToken} from '@angular/core';
import {MODEL_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ModelDTO} from "../../../../model/dto/impl/ModelDTO";
import {ModelSearchDTO} from "../../../../model/search/impl/ModelSearchDTO";
import {ASearchPageService} from "../../asearch-page.service";

@Injectable({
  providedIn: 'root'
})
export class SearchPageModelService extends ASearchPageService<ModelDTO, ModelSearchDTO> {
  constructor(@Inject(MODEL_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
