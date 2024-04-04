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

  createList(d: D): Observable<boolean> {
    return this.httpClient.post<boolean>(this.baseUrl + '/save-all', d)
  }

  read(id: number): Observable<D> {
    return this.httpClient.post<D>(this.baseUrl + '/get-by-id', id)
  }

  updateList(d: D): Observable<D> {
    return this.httpClient.post<D>(this.baseUrl + '/save-all', d)
  }

  delete(id: number): Observable<D> {
    return this.httpClient.post<D>(this.baseUrl + '/delete-by-id', id)
  }

  create(d: D): Observable<D> {
    return this.httpClient.post<D>(this.baseUrl + '/save', d);
  }

  update(d: D): Observable<D> {
    return this.httpClient.post<D>(this.baseUrl + '/save', d);
  }

}
