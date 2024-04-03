import {Inject, Injectable, InjectionToken} from '@angular/core';
import {OBORUD_VID_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ABaseService} from "../../abase.service";
import {OborudVidDTO} from "../../../model/dto/impl/OborudVid";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OtherMethodOborudVidService extends ABaseService{

  constructor(@Inject(OBORUD_VID_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient)
  }

  findByKlassId(klassId: number): Observable<OborudVidDTO[]>{
    return this.httpClient.post<OborudVidDTO[]>(this.baseUrl + '/find-by-klass-id', klassId)
  }
}
