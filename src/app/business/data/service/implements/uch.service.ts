import {Injectable} from '@angular/core';
import {UchDTO} from "../../model/dto/impl/UchDTO";
import {Observable} from "rxjs";
import {SearchPageUchService} from "../SearchService/impl/SearchPage/search-page-uch.service";
import {SearchListUchService} from "../SearchService/impl/SearchList/search-list-uch.service";
import {CRUDUchService} from "../CRUDService/impl/cruduch.service";
import {UchSearchDTO} from "../../model/search/impl/UchSearchDTO";
import {SearchAllUchService} from "../SearchService/impl/SearchAll/search-all-uch.service";

@Injectable({
  providedIn: 'root'
})
export class UchService {
  constructor(private crudUchService: CRUDUchService,
              private searchListUchService: SearchListUchService,
              private searchPageUchService: SearchPageUchService,
              private searchAllUchService: SearchAllUchService) { }

  create(gruppaDTO: UchDTO[]): Observable<boolean>{
    return this.crudUchService.create(gruppaDTO);
  }

  read(id: number): Observable<UchDTO>{
    return this.crudUchService.read(id);
  }

  update(gruppaDTO: UchDTO[]): Observable<boolean>{
    return this.crudUchService.create(gruppaDTO);
  }

  delete(gruppaDTO: UchDTO[]): Observable<boolean>{
    return this.crudUchService.create(gruppaDTO);
  }

  searchAll(): Observable<UchDTO[]>{
    return this.searchAllUchService.searchAll();
  }

  searchList(): Observable<UchDTO[]>{
    return this.searchListUchService.searchList();
  }

  searchPage(UchSearchDTO: UchSearchDTO){
    return this.searchPageUchService.searchPage(UchSearchDTO);
  }
}
