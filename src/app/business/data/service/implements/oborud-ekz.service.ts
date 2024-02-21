import {Injectable} from '@angular/core';
import {CRUDOborudEkzService} from "../CRUDService/impl/crudoborud-ekz.service";
import {SearchListOborudEkzService} from "../SearchService/impl/SearchList/search-list-oborud-ekz.service";
import {SearchPageOborudEkzService} from "../SearchService/impl/SearchPage/search-page-oborud-ekz.service";
import {Observable} from "rxjs";
import {OborudEkzDTO} from "../../model/dto/impl/OborudEkzDTO";
import {OborudEkzSearchDTO} from "../../model/search/impl/OborudEkzSearchDTO";
import {SearchAllOborudEkzService} from "../SearchService/impl/SearchAll/search-all-oborud-ekz.service";

@Injectable({
  providedIn: 'root'
})
export class OborudEkzService {
  constructor(private crudOborudEkzService: CRUDOborudEkzService,
              private searchListOborudEkzService: SearchListOborudEkzService,
              private searchPageOborudEkzService: SearchPageOborudEkzService,
              private searchAllOborudEkzService: SearchAllOborudEkzService) { }

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

  searchAll(): Observable<OborudEkzDTO[]>{
    return this.searchAllOborudEkzService.searchAll();
  }

  searchList(): Observable<OborudEkzDTO[]>{
    return this.searchListOborudEkzService.searchList();
  }

  searchPage(oborudEkzSearchDTO: OborudEkzSearchDTO){
    return this.searchPageOborudEkzService.searchPage(oborudEkzSearchDTO);
  }
}
