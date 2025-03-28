import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OBORUD_EKZ_URL_TOKEN} from "../../../../../app.constant";
import {ACRUDService} from "../acrud.service";
import {OborudEkzDTO} from "../../../model/dto/impl/OborudEkzDTO";

@Injectable({
  providedIn: 'root'
})
export class CRUDOborudEkzService extends ACRUDService<any>{
  constructor(@Inject(OBORUD_EKZ_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }
}
