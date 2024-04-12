import {Inject, Injectable, InjectionToken} from '@angular/core';
import {KOMPL_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {ABaseService} from "../../abase.service";
import {KomplDTO} from "../../../model/dto/impl/KomplDTO";

@Injectable({
  providedIn: 'root'
})
export class OtherMethodKomplService extends ABaseService{
  constructor(@Inject(KOMPL_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }

  findByGruppaId(gruppaId: number): Observable<KomplDTO[]>{
    return this.httpClient.post<KomplDTO[]>(this.baseUrl + '/find-by-gruppa-id', gruppaId)
  }

  findByModelId(modelId: number): Observable<KomplDTO[]>{
    return this.httpClient.post<KomplDTO[]>(this.baseUrl + '/find-by-model-id', modelId)
  }
}
