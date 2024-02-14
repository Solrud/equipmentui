import {Injectable} from '@angular/core';
import {GruppaSearchDTO} from "../../model/search/impl/GruppaSearchDTO";
import {Observable} from "rxjs";
import {KomplDTO} from "../../model/dto/impl/KomplDTO";
import {CRUDKomplService} from "../CRUDService/impl/crudkompl.service";
import {SearchListKomplService} from "../SearchService/impl/SearchList/search-list-kompl.service";
import {SearchPageKomplService} from "../SearchService/impl/SearchPage/search-page-kompl.service";

@Injectable({
  providedIn: 'root'
})
export class KomplService {

  constructor(private crudKomplService: CRUDKomplService,
              private searchListKomplService: SearchListKomplService,
              private searchPageKomplService: SearchPageKomplService) { }

  create(komplDTO: KomplDTO[]): Observable<boolean>{
    return this.crudKomplService.create(komplDTO);
  }

  read(id: number): Observable<KomplDTO>{
    return this.crudKomplService.read(id);
  }

  update(komplDTO: KomplDTO[]): Observable<boolean>{
    return this.crudKomplService.create(komplDTO);
  }

  delete(komplDTO: KomplDTO[]): Observable<boolean>{
    return this.crudKomplService.create(komplDTO);
  }

  searchList(searchObject: any = ''): Observable<KomplDTO[]>{
    return this.searchListKomplService.searchList(searchObject);
  }

  searchPage(gruppaSearchDTO: GruppaSearchDTO){
    return this.searchPageKomplService.searchPage(gruppaSearchDTO);
  }
}
