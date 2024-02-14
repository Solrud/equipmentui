import {Injectable} from '@angular/core';
import {ModelDTO} from "../../model/dto/impl/ModelDTO";
import {Observable} from "rxjs";
import {ModelSearchDTO} from "../../model/search/impl/ModelSearchDTO";
import {SearchListModelService} from "../SearchService/impl/SearchList/search-list-model.service";
import {SearchPageModelService} from "../SearchService/impl/SearchPage/search-page-model.service";
import {CRUDModelService} from "../CRUDService/impl/crudmodel.service";

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  constructor(private crudModelService: CRUDModelService,
              private searchListModelService: SearchListModelService,
              private searchPageModelService: SearchPageModelService) {
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

  searchList(searchObject: any = ''): Observable<ModelDTO[]> {
    return this.searchListModelService.searchList(searchObject);
  }

  searchPage(modelSearchDTO: ModelSearchDTO) {
    return this.searchPageModelService.searchPage(modelSearchDTO);
  }
}
