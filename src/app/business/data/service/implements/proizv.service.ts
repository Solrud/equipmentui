import {Injectable} from '@angular/core';
import {SearchListProizvService} from "../SearchService/impl/SearchList/search-list-proizv.service";
import {Observable} from "rxjs";
import {SearchPageProizvService} from "../SearchService/impl/SearchPage/search-page-proizv.service";
import {CRUDProizvService} from "../CRUDService/impl/crudproizv.service";
import {ProizvSearchDTO} from "../../model/search/impl/ProizvSearchDTO";
import {ProizvDTO} from "../../model/dto/impl/ProizvDTO";
import {SearchAllProizvService} from "../SearchService/impl/SearchAll/search-all-proizv.service";
import {PodrDTO} from "../../model/dto/impl/PodrDTO";

@Injectable({
  providedIn: 'root'
})
export class ProizvService {
  constructor(private crudProizvService: CRUDProizvService,
              private searchListProizvService: SearchListProizvService,
              private searchPageProizvService: SearchPageProizvService,
              private searchAllProizvService: SearchAllProizvService) { }

  create(proizvDTO: ProizvDTO): Observable<boolean>{
    return this.crudProizvService.create(proizvDTO);
  }

  read(id: number): Observable<ProizvDTO>{
    return this.crudProizvService.read(id);
  }

  update(proizvDTO: ProizvDTO): Observable<boolean>{
    return this.crudProizvService.update(proizvDTO);
  }

  delete(id: number): Observable<boolean>{
    return this.crudProizvService.delete(id);
  }

  searchAll(): Observable<ProizvDTO[]>{
    return this.searchAllProizvService.searchAll();
  }

  searchList(): Observable<ProizvDTO[]>{
    return this.searchListProizvService.searchList();
  }

  searchPage(proizvSearchDTO: ProizvSearchDTO){
    return this.searchPageProizvService.searchPage(proizvSearchDTO);
  }

  createList(proizvDTO: ProizvDTO[]): Observable<boolean>{
    return this.crudProizvService.createList(proizvDTO);
  }

  updateList(proizvDTO: ProizvDTO[]): Observable<boolean>{
    return this.crudProizvService.updateList(proizvDTO);
  }
}
