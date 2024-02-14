import {Inject, Injectable, InjectionToken} from '@angular/core';
import {OBORUD_EKZ_URL_TOKEN, PODR_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ACRUDService} from "../acrud.service";
import {PodrDTO} from "../../../model/dto/impl/PodrDTO";

@Injectable({
  providedIn: 'root'
})
export class CRUDPodrService extends ACRUDService<any>{
  constructor(@Inject(PODR_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }
}
