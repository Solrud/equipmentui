import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {CRUDGabZoService} from "../CRUDService/impl/crudgab-zo.service";
import {SearchPageGabZoService} from "../SearchService/impl/SearchPage/search-page-gab-zo.service";
import {SearchAllGabZoService} from "../SearchService/impl/SearchAll/search-all-gab-zo.service";
import {GabZoDTO} from "../../model/dto/impl/GabZoDTO";
import {GabZoSearchDTO} from "../../model/search/impl/GabZoSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class GabZoService {
  constructor(private crudGabZoService: CRUDGabZoService,
              private searchPageGabZoService: SearchPageGabZoService,
              private searchAllGabZoService: SearchAllGabZoService) { }

  create(gabZoDTO: GabZoDTO): Observable<boolean>{
    return this.crudGabZoService.create(gabZoDTO);
  }

  read(id: number): Observable<GabZoDTO>{
    return this.crudGabZoService.read(id);
  }

  update(gabZoDTO: GabZoDTO): Observable<boolean>{
    return this.crudGabZoService.update(gabZoDTO);
  }

  delete(id: number): Observable<boolean>{
    return this.crudGabZoService.delete(id);
  }

  searchAll(): Observable<GabZoDTO[]>{
    return this.searchAllGabZoService.searchAll();
  }

  searchPage(gabZoSearchDTO: GabZoSearchDTO){
    return this.searchPageGabZoService.searchPage(gabZoSearchDTO);
  }

  createList(gabZoDTO: GabZoDTO[]): Observable<boolean>{
    return this.crudGabZoService.createList(gabZoDTO);
  }

  updateList(gabZoDTO: GabZoDTO[]): Observable<boolean>{
    return this.crudGabZoService.updateList(gabZoDTO);
  }
}
