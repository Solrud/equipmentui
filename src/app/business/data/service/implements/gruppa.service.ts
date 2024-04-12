import {Injectable} from '@angular/core';
import {GruppaDTO} from "../../model/dto/impl/GruppaDTO";
import {Observable} from "rxjs";
import {CRUDGruppaService} from "../CRUDService/impl/crudgruppa.service";
import {SearchListGruppaService} from "../SearchService/impl/SearchList/search-list-gruppa.service";
import {SearchPageGruppaService} from "../SearchService/impl/SearchPage/search-page-gruppa.service";
import {GruppaSearchDTO} from "../../model/search/impl/GruppaSearchDTO";
import {SearchAllGruppaService} from "../SearchService/impl/SearchAll/search-all-gruppa.service";
import {OtherMethodGruppaService} from "../OtherMethodService/implements/other-method-gruppa.service";

@Injectable({
  providedIn: 'root'
})
export class GruppaService {

  constructor(private crudGruppaService: CRUDGruppaService,
              private searchListGruppaService: SearchListGruppaService,
              private searchPageGruppaService: SearchPageGruppaService,
              private searchAllGruppaService: SearchAllGruppaService,
              private otherMethodGruppaService: OtherMethodGruppaService) { }

  create(gruppaDTO: GruppaDTO): Observable<boolean>{
    return this.crudGruppaService.create(gruppaDTO);
  }

  read(id: number): Observable<GruppaDTO>{
    return this.crudGruppaService.read(id);
  }

  update(gruppaDTO: GruppaDTO): Observable<boolean>{
    return this.crudGruppaService.update(gruppaDTO);
  }

  delete(id: number): Observable<boolean>{
    return this.crudGruppaService.delete(id);
  }

  searchAll(): Observable<GruppaDTO[]>{
    return this.searchAllGruppaService.searchAll();
  }

  searchList(): Observable<GruppaDTO[]>{
    return this.searchListGruppaService.searchList();
  }

  searchPage(gruppaSearchDTO: GruppaSearchDTO){
    return this.searchPageGruppaService.searchPage(gruppaSearchDTO);
  }

  createList(gruppaDTO: GruppaDTO[]): Observable<boolean>{
    return this.crudGruppaService.createList(gruppaDTO);
  }

  updateList(gruppaDTO: GruppaDTO[]): Observable<boolean>{
    return this.crudGruppaService.updateList(gruppaDTO);
  }

  findByKomplId(komplId: number): Observable<GruppaDTO[]>{
    return this.otherMethodGruppaService.findByKomplId(komplId);
  }

  findByModelId(modelId: number): Observable<GruppaDTO[]>{
    return this.otherMethodGruppaService.findByModelId(modelId);
  }
}
