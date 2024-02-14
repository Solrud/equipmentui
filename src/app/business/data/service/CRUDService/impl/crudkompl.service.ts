import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GRUPPA_URL_TOKEN, KOMPL_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ACRUDService} from "../acrud.service";
import {KomplDTO} from "../../../model/dto/impl/KomplDTO";

@Injectable({
  providedIn: 'root'
})
export class CRUDKomplService extends ACRUDService<any>{
  constructor(@Inject(KOMPL_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }
}
