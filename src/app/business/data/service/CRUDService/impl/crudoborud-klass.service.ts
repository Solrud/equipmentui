import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OBORUD_KLASS_URL_TOKEN} from "../../../../../app.constant";
import {ACRUDService} from "../acrud.service";


@Injectable({
  providedIn: 'root'
})
export class CRUDOborudKlassService extends ACRUDService<any>{
  constructor(@Inject(OBORUD_KLASS_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }
}
