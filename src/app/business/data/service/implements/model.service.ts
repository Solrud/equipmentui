import {Injectable} from '@angular/core';
import {ModelDTO} from "../../model/dto/impl/ModelDTO";
import {Observable} from "rxjs";
import {ModelSearchDTO} from "../../model/search/impl/ModelSearchDTO";
import {SearchListModelService} from "../SearchService/impl/SearchList/search-list-model.service";
import {SearchPageModelService} from "../SearchService/impl/SearchPage/search-page-model.service";
import {CRUDModelService} from "../CRUDService/impl/crudmodel.service";
import {SearchAllModelService} from "../SearchService/impl/SearchAll/search-all-model.service";
import {GruppaDTO} from "../../model/dto/impl/GruppaDTO";

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  constructor(private crudModelService: CRUDModelService,
              private searchListModelService: SearchListModelService,
              private searchPageModelService: SearchPageModelService,
              private searchAllModelService: SearchAllModelService) {
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
}
