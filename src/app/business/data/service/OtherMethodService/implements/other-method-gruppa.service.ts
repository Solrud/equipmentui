import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ABaseService} from "../../abase.service";
import {GRUPPA_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GruppaDTO} from '../../../model/dto/impl/GruppaDTO';
import {KomplDTO} from "../../../model/dto/impl/KomplDTO";

@Injectable({
  providedIn: 'root'
})
export class OtherMethodGruppaService extends ABaseService{
  constructor(@Inject(GRUPPA_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }

  findByKomplId(komplId: number): Observable<GruppaDTO[]>{
    return this.httpClient.post<GruppaDTO[]>(this.baseUrl + '/find-by-kompl-id', komplId)
  }

  findByModelId(modelId: number): Observable<GruppaDTO[]>{
    return this.httpClient.post<GruppaDTO[]>(this.baseUrl + '/find-by-model-id', modelId)
  }

  setKompleksyById(id: string, komplList: KomplDTO[]): Observable<GruppaDTO>{
    return this.httpClient.post<GruppaDTO>(this.baseUrl + '/set-kompleksy-by-id/' + id,  komplList);
  }
}
