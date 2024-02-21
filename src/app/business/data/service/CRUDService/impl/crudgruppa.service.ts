import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GRUPPA_URL_TOKEN} from "../../../../../app.constant";
import {HttpClient} from "@angular/common/http";
import {ACRUDService} from "../acrud.service";
import {GruppaDTO} from "../../../model/dto/impl/GruppaDTO";

@Injectable({
  providedIn: 'root'
})
export class CRUDGruppaService extends ACRUDService<any>{
  constructor(@Inject(GRUPPA_URL_TOKEN) baseUrl: InjectionToken<string>, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }
}

//ToDo сделать доп сервис чтобы был тип GruppaDTO | GruppaDTO[], а не any
