import {Injectable} from '@angular/core';
import {CRUDOborudEkzService} from "../CRUDService/impl/crudoborud-ekz.service";
import {SearchListOborudEkzService} from "../SearchService/impl/SearchList/search-list-oborud-ekz.service";
import {SearchPageOborudEkzService} from "../SearchService/impl/SearchPage/search-page-oborud-ekz.service";
import {Observable} from "rxjs";
import {OborudEkzDTO} from "../../model/dto/impl/OborudEkzDTO";
import {OborudEkzSearchDTO} from "../../model/search/impl/OborudEkzSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class OborudEkzService {
  constructor(private crudOborudEkzService: CRUDOborudEkzService,
              private searchListOborudEkzService: SearchListOborudEkzService,
              private searchPageOborudEkzService: SearchPageOborudEkzService) { }

  create(oborudEkzDTO: OborudEkzDTO[]): Observable<boolean>{
    return this.crudOborudEkzService.create(oborudEkzDTO);
  }

  read(id: number): Observable<OborudEkzDTO>{
    return this.crudOborudEkzService.read(id);
  }

  update(oborudEkzDTO: OborudEkzDTO[]): Observable<boolean>{
    return this.crudOborudEkzService.create(oborudEkzDTO);
  }

  delete(oborudEkzDTO: OborudEkzDTO[]): Observable<boolean>{
    return this.crudOborudEkzService.create(oborudEkzDTO);
  }

  searchList(searchObject: any = ''): Observable<OborudEkzDTO[]>{
    return this.searchListOborudEkzService.searchList(searchObject);
  }

  searchPage(oborudEkzSearchDTO: OborudEkzSearchDTO){
    return this.searchPageOborudEkzService.searchPage(oborudEkzSearchDTO);
  }
}
