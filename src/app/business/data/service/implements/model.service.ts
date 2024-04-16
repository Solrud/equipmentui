import {Injectable} from '@angular/core';
import {ModelDTO} from "../../model/dto/impl/ModelDTO";
import {Observable} from "rxjs";
import {ModelSearchDTO} from "../../model/search/impl/ModelSearchDTO";
import {SearchListModelService} from "../SearchService/impl/SearchList/search-list-model.service";
import {SearchPageModelService} from "../SearchService/impl/SearchPage/search-page-model.service";
import {CRUDModelService} from "../CRUDService/impl/crudmodel.service";
import {SearchAllModelService} from "../SearchService/impl/SearchAll/search-all-model.service";
import {OtherMethodModelService} from "../OtherMethodService/implements/other-method-model.service";
import {GruppaDTO} from "../../model/dto/impl/GruppaDTO";
import {KomplDTO} from "../../model/dto/impl/KomplDTO";

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  constructor(private crudModelService: CRUDModelService,
              private searchListModelService: SearchListModelService,
              private searchPageModelService: SearchPageModelService,
              private searchAllModelService: SearchAllModelService,
              private otherMethodModelService: OtherMethodModelService) {
  }

  create(modelDTO: ModelDTO): Observable<boolean> {
    return this.crudModelService.create(modelDTO);
  }

  read(id: number): Observable<ModelDTO> {
    return this.crudModelService.read(id);
  }

  update(modelDTO: ModelDTO): Observable<boolean> {
    return this.crudModelService.update(modelDTO);
  }

  delete(id: number): Observable<boolean> {
    return this.crudModelService.delete(id);
  }

  searchAll(): Observable<ModelDTO[]>{
    return this.searchAllModelService.searchAll();
  }

  searchPage(modelSearchDTO: ModelSearchDTO) {
    return this.searchPageModelService.searchPage(modelSearchDTO);
  }

  createList(modelDTO: ModelDTO[]): Observable<boolean>{
    return this.crudModelService.createList(modelDTO);
  }

  updateList(modelDTO: ModelDTO[]): Observable<boolean>{
    return this.crudModelService.updateList(modelDTO);
  }

  findByKomplId(komplId: number): Observable<ModelDTO[]>{
    return this.otherMethodModelService.findByKomplId(komplId);
  }

  findByGruppaId(gruppaId: number): Observable<ModelDTO[]>{
    return this.otherMethodModelService.findByGruppaId(gruppaId);
  }

  setGruppyById(id: string, gruppaList: any): Observable<ModelDTO>{
    return this.otherMethodModelService.setGruppyById(id, gruppaList);
  }

  setKompleksyById(id: string, komplList: KomplDTO[]): Observable<ModelDTO>{
    return this.otherMethodModelService.setKompleksyById(id, komplList);
  }
}
