import {Inject, Injectable, InjectionToken} from '@angular/core';
import {PODR_URL_TOKEN, PROIZV_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ACRUDService} from "../acrud.service";
import {ProizvDTO} from "../../../model/dto/impl/ProizvDTO";

@Injectable({
  providedIn: 'root'
})
export class CRUDProizvService extends ACRUDService<any>{
  constructor(@Inject(PROIZV_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }
}
