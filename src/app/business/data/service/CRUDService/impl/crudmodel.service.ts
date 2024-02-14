import {Inject, Injectable, InjectionToken} from '@angular/core';
import {KOMPL_URL_TOKEN, MODEL_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ACRUDService} from "../acrud.service";
import {ModelDTO} from "../../../model/dto/impl/ModelDTO";

@Injectable({
  providedIn: 'root'
})
export class CRUDModelService extends ACRUDService<any> {
  constructor(@Inject(MODEL_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }
}
