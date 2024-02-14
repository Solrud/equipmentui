import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ASearchListService} from "../../asearch-list.service";
import {MODEL_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ModelDTO} from "../../../../model/dto/impl/ModelDTO";
import {ModelSearchDTO} from "../../../../model/search/impl/ModelSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchListModelService extends ASearchListService<ModelDTO> {
  constructor(@Inject(MODEL_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
