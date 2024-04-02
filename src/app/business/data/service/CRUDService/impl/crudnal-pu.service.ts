import {Inject, Injectable, InjectionToken} from '@angular/core';
import {NAL_PU_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ACRUDService} from "../acrud.service";

@Injectable({
  providedIn: 'root'
})
export class CRUDNalPuService extends ACRUDService<any> {
  constructor(@Inject(NAL_PU_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }
}
