import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {CRUDOborudVidService} from "../CRUDService/impl/crudoborud-vid.service";
import {SearchListOborudVidService} from "../SearchService/impl/SearchList/search-list-oborud-vid.service";
import {SearchPageOborudVidService} from "../SearchService/impl/SearchPage/search-page-oborud-vid.service";
import {OborudVidDTO} from "../../model/dto/impl/OborudVid";
import {OborudVidSearchDTO} from "../../model/search/impl/OborudVidSearchDTO";
import {SearchAllOborudVidService} from "../SearchService/impl/SearchAll/search-all-oborud-vid.service";

@Injectable({
  providedIn: 'root'
})
export class OborudVidService {
  constructor(private crudOborudVidService: CRUDOborudVidService,
              private searchListOborudVidService: SearchListOborudVidService,
              private searchPageOborudVidService: SearchPageOborudVidService,
              private searchAllOborudVidService: SearchAllOborudVidService) { }

  create(oborudVidDTO: OborudVidDTO[]): Observable<boolean>{
    return this.crudOborudVidService.create(oborudVidDTO);
  }

  read(id: number): Observable<OborudVidDTO>{
    return this.crudOborudVidService.read(id);
  }

  update(oborudVidDTO: OborudVidDTO[]): Observable<boolean>{
    return this.crudOborudVidService.create(oborudVidDTO);
  }

  delete(oborudEkzDTO: OborudVidDTO[]): Observable<boolean>{
    return this.crudOborudVidService.create(oborudEkzDTO);
  }

  searchAll(): Observable<OborudVidDTO[]>{
    return this.searchAllOborudVidService.searchAll();
  }

  searchList(): Observable<OborudVidDTO[]>{
    return this.searchListOborudVidService.searchList();
  }

  searchPage(oborudVidSearchDTO: OborudVidSearchDTO){
    return this.searchPageOborudVidService.searchPage(oborudVidSearchDTO);
  }
}
