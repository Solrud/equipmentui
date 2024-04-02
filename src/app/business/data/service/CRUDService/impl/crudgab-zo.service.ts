import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GAB_ZO_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ACRUDService} from "../acrud.service";

@Injectable({
  providedIn: 'root'
})
export class CRUDGabZoService extends ACRUDService<any>{
  constructor(@Inject(GAB_ZO_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }
}
