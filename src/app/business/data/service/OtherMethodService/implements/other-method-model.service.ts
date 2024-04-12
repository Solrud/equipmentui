import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ABaseService} from "../../abase.service";
import {MODEL_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {ModelDTO} from "../../../model/dto/impl/ModelDTO";

@Injectable({
  providedIn: 'root'
})
export class OtherMethodModelService extends ABaseService{
  constructor(@Inject(MODEL_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }

  findByKomplId(komplId: number): Observable<ModelDTO[]>{
    return this.httpClient.post<ModelDTO[]>(this.baseUrl + '/find-by-kompl-id', komplId)
  }

  findByGruppaId(gruppaId: number): Observable<ModelDTO[]>{
    return this.httpClient.post<ModelDTO[]>(this.baseUrl + '/find-by-gruppa-id', gruppaId)
  }
}
