import {Inject, Injectable, InjectionToken} from '@angular/core';
import {PROIZV_URL_TOKEN} from "../../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ProizvDTO} from "../../../../model/dto/impl/ProizvDTO";
import {ASearchAllService} from "../../asearch-all.service";

@Injectable({
  providedIn: 'root'
})
export class SearchAllProizvService extends ASearchAllService<ProizvDTO>{
  constructor(@Inject(PROIZV_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }
}
