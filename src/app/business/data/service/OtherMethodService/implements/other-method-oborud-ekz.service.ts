import {Inject, Injectable, InjectionToken} from '@angular/core';
import {OBORUD_EKZ_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ABaseService} from "../../abase.service";
import {Observable} from "rxjs";
import {OborudEkzDTO} from "../../../model/dto/impl/OborudEkzDTO";

@Injectable({
  providedIn: 'root'
})
export class OtherMethodOborudEkzService extends ABaseService{
  constructor(@Inject(OBORUD_EKZ_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }

  findByModelId(modelId: number): Observable<OborudEkzDTO[]>{
    return this.httpClient.post<OborudEkzDTO[]>(this.baseUrl + '/find-by-model-id', modelId)
  }
}
