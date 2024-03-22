import {Injectable} from '@angular/core';
import {PodrSearchDTO} from "../../model/search/impl/PodrSearchDTO";
import {Observable} from "rxjs";
import {PodrDTO} from "../../model/dto/impl/PodrDTO";
import {SearchPagePodrService} from "../SearchService/impl/SearchPage/search-page-podr.service";
import {SearchListPodrService} from "../SearchService/impl/SearchList/search-list-podr.service";
import {CRUDPodrService} from "../CRUDService/impl/crudpodr.service";
import {SearchAllPodrService} from "../SearchService/impl/SearchAll/search-all-podr.service";
import {OborudVidDTO} from "../../model/dto/impl/OborudVid";

@Injectable({
  providedIn: 'root'
})
export class PodrService {
  constructor(private crudPodrService: CRUDPodrService,
              private searchListPodrService: SearchListPodrService,
              private searchPagePodrService: SearchPagePodrService,
              private searchAllPodrService: SearchAllPodrService) { }

  create(podrDTO: PodrDTO): Observable<boolean>{
    return this.crudPodrService.create(podrDTO);
  }

  read(id: number): Observable<PodrDTO>{
    return this.crudPodrService.read(id);
  }

  update(podrDTO: PodrDTO): Observable<boolean>{
    return this.crudPodrService.update(podrDTO);
  }

  delete(id: number): Observable<boolean>{
    return this.crudPodrService.delete(id);
  }

  searchAll(): Observable<PodrDTO[]>{
    return this.searchAllPodrService.searchAll();
  }

  searchList(): Observable<PodrDTO[]>{
    return this.searchListPodrService.searchList();
  }

  searchPage(podrSearchDTO: PodrSearchDTO){
    return this.searchPagePodrService.searchPage(podrSearchDTO);
  }

  createList(podrDTO: PodrDTO[]): Observable<boolean>{
    return this.crudPodrService.createList(podrDTO);
  }

  updateList(podrDTO: PodrDTO[]): Observable<boolean>{
    return this.crudPodrService.updateList(podrDTO);
  }
}
