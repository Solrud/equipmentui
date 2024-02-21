import {Inject, Injectable, InjectionToken} from '@angular/core';
import {MODEL_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ModelDTO} from "../../../../model/dto/impl/ModelDTO";
import {ASearchAllService} from "../../asearch-all.service";

@Injectable({
  providedIn: 'root'
})
export class SearchAllModelService extends ASearchAllService<ModelDTO> {
  constructor(@Inject(MODEL_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
