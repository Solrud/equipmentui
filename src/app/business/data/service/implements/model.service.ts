import {Injectable} from '@angular/core';
import {ModelDTO} from "../../model/dto/impl/ModelDTO";
import {Observable} from "rxjs";
import {ModelSearchDTO} from "../../model/search/impl/ModelSearchDTO";
import {SearchListModelService} from "../SearchService/impl/SearchList/search-list-model.service";
import {SearchPageModelService} from "../SearchService/impl/SearchPage/search-page-model.service";
import {CRUDModelService} from "../CRUDService/impl/crudmodel.service";
import {SearchAllModelService} from "../SearchService/impl/SearchAll/search-all-model.service";

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  constructor(private crudModelService: CRUDModelService,
              private searchListModelService: SearchListModelService,
              private searchPageModelService: SearchPageModelService,
              private searchAllModelService: SearchAllModelService) {
  }

  create(modelDTO: ModelDTO[]): Observable<boolean> {
    return this.crudModelService.create(modelDTO);
  }

  read(id: number): Observable<ModelDTO> {
    return this.crudModelService.read(id);
  }

  update(modelDTO: ModelDTO[]): Observable<boolean> {
    return this.crudModelService.create(modelDTO);
  }

  delete(modelDTO: ModelDTO[]): Observable<boolean> {
    return this.crudModelService.create(modelDTO);
  }

  searchAll(): Observable<ModelDTO[]>{
    return this.searchAllModelService.searchAll();
  }

  searchList(): Observable<ModelDTO[]> {
    return this.searchListModelService.searchList();
  }

  searchPage(modelSearchDTO: ModelSearchDTO) {
    return this.searchPageModelService.searchPage(modelSearchDTO);
  }
}
