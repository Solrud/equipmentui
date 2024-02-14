import {Inject, Injectable, InjectionToken} from '@angular/core';
import {PROIZV_URL_TOKEN, UCH_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ACRUDService} from "../acrud.service";
import {UchDTO} from "../../../model/dto/impl/UchDTO";

@Injectable({
  providedIn: 'root'
})
export class CRUDUchService extends ACRUDService<any> {
  constructor(@Inject(UCH_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }
}
