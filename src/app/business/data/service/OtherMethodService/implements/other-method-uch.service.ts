import {Inject, Injectable, InjectionToken} from '@angular/core';
import {UCH_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ABaseService} from "../../abase.service";
import {UchDTO} from "../../../model/dto/impl/UchDTO";

@Injectable({
  providedIn: 'root'
})
export class OtherMethodUchService extends ABaseService{

  constructor(@Inject(UCH_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }

  findByPodrId(podrId: number): Observable<UchDTO[]>{
    return this.httpClient.post<UchDTO[]>(this.baseUrl + '/find-by-podr-id', podrId)
  }
}
