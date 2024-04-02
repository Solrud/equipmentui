import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {NalPuSearchDTO} from "../../model/search/impl/NalPuSearchDTO";
import {CRUDNalPuService} from "../CRUDService/impl/crudnal-pu.service";
import {SearchPageNalPuService} from "../SearchService/impl/SearchPage/search-page-nal-pu.service";
import {SearchAllNalPuService} from "../SearchService/impl/SearchAll/search-all-nal-pu.service";
import {NalPuDTO} from "../../model/dto/impl/NalPuDTO";

@Injectable({
  providedIn: 'root'
})
export class NalPuService {

  constructor(private crudNalPuService: CRUDNalPuService,
              private searchPageNalPuService: SearchPageNalPuService,
              private searchAllNalPuService: SearchAllNalPuService) { }

  create(nalPuDTO: NalPuDTO): Observable<boolean>{
    return this.crudNalPuService.create(nalPuDTO);
  }

  read(id: number): Observable<NalPuDTO>{
    return this.crudNalPuService.read(id);
  }

  update(nalPuDTO: NalPuDTO): Observable<boolean>{
    return this.crudNalPuService.update(nalPuDTO);
  }

  delete(id: number): Observable<boolean>{
    return this.crudNalPuService.delete(id);
  }

  searchAll(): Observable<NalPuDTO[]>{
    return this.searchAllNalPuService.searchAll();
  }

  searchPage(nalPuSearchDTO: NalPuSearchDTO){
    return this.searchPageNalPuService.searchPage(nalPuSearchDTO);
  }

  createList(nalPuDTO: NalPuDTO[]): Observable<boolean>{
    return this.crudNalPuService.createList(nalPuDTO);
  }

  updateList(nalPuDTO: NalPuDTO[]): Observable<boolean>{
    return this.crudNalPuService.updateList(nalPuDTO);
  }
}
