import {Injectable, InjectionToken} from '@angular/core';
import {IBaseDTO} from "../../model/dto/IBaseDTO";
import {ICRUDService} from "./icrud.service";
import {ABaseService} from "../abase.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class ACRUDService<D extends IBaseDTO> extends ABaseService implements ICRUDService<D>{

  protected constructor(baseUrl: InjectionToken<string>, httpClient: HttpClient ) {
    super(baseUrl, httpClient)
  }

  create(d: D): Observable<boolean> {
    return this.httpClient.post<boolean>(this.baseUrl + '/save-all', d)
  }

  read(id: number): Observable<D> {
    return this.httpClient.post<D>(this.baseUrl + '/get-by-id', id)
  }

  update(d: D): Observable<D> {
    return this.httpClient.post<D>(this.baseUrl + '/save-all', d)
  }

  delete(d: D): Observable<D> {
    return this.httpClient.post<D>(this.baseUrl + '/save-all', d)
  }


}
