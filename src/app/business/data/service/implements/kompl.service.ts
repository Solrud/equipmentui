import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {KomplDTO} from "../../model/dto/impl/KomplDTO";
import {CRUDKomplService} from "../CRUDService/impl/crudkompl.service";
import {SearchListKomplService} from "../SearchService/impl/SearchList/search-list-kompl.service";
import {SearchPageKomplService} from "../SearchService/impl/SearchPage/search-page-kompl.service";
import {SearchAllKomplService} from "../SearchService/impl/SearchAll/search-all-kompl.service";
import {KomplSearchDTO} from "../../model/search/impl/KomplSearchDTO";
import {OtherMethodKomplService} from "../OtherMethodService/implements/other-method-kompl.service";

@Injectable({
  providedIn: 'root'
})
export class KomplService {

  constructor(private crudKomplService: CRUDKomplService,
              private searchListKomplService: SearchListKomplService,
              private searchPageKomplService: SearchPageKomplService,
              private searchAllKomplService: SearchAllKomplService,
              private otherMethodKomplService: OtherMethodKomplService) { }

  create(komplDTO: KomplDTO): Observable<boolean>{
    return this.crudKomplService.create(komplDTO);
  }

  read(id: number): Observable<KomplDTO>{
    return this.crudKomplService.read(id);
  }

  update(komplDTO: KomplDTO): Observable<boolean>{
    return this.crudKomplService.update(komplDTO);
  }

  delete(id: number): Observable<boolean>{
    return this.crudKomplService.delete(id);
  }

  searchAll(): Observable<KomplDTO[]>{
    return this.searchAllKomplService.searchAll();
  }

  searchList(): Observable<KomplDTO[]>{
    return this.searchListKomplService.searchList();
  }

  searchPage(komplSearchDTO: KomplSearchDTO){
    return this.searchPageKomplService.searchPage(komplSearchDTO);
  }

  createList(komplDTO: KomplDTO[]): Observable<boolean>{
    return this.crudKomplService.createList(komplDTO);
  }

  updateList(komplDTO: KomplDTO[]): Observable<boolean>{
    return this.crudKomplService.updateList(komplDTO);
  }

  findByGruppaId(gruppaId: number): Observable<KomplDTO[]>{
    return this.otherMethodKomplService.findByGruppaId(gruppaId);
  }

  findByModelId(modelId: number): Observable<KomplDTO[]>{
    return this.otherMethodKomplService.findByModelId(modelId);
  }
}
