import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {OborudEkzDTO} from "../../model/dto/impl/OborudEkzDTO";
import {OborudKlassDTO} from "../../model/dto/impl/OborudKlassDTO";
import {CRUDOborudKlassService} from "../CRUDService/impl/crudoborud-klass.service";
import {SearchPageOborudKlassService} from "../SearchService/impl/SearchPage/search-page-oborud-klass.service";
import {SearchAllOborudKlassService} from "../SearchService/impl/SearchAll/search-all-oborud-klass.service";
import {OborudKlassSearchDTO} from "../../model/search/impl/OborudKlassSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class OborudKlassService {
  constructor(private crudOborudKlassService: CRUDOborudKlassService,
              private searchPageOborudKlassService: SearchPageOborudKlassService,
              private searchAllOborudKlassService: SearchAllOborudKlassService) { }

  create(oborudKlassDTO: OborudKlassDTO): Observable<boolean>{
    return this.crudOborudKlassService.create(oborudKlassDTO);
  }

  read(id: number): Observable<OborudEkzDTO>{
    return this.crudOborudKlassService.read(id);
  }

  update(oborudKlassDTO: OborudKlassDTO): Observable<boolean>{
    return this.crudOborudKlassService.update(oborudKlassDTO);
  }

  delete(id: number): Observable<boolean>{
    return this.crudOborudKlassService.delete(id);
  }

  searchAll(): Observable<OborudKlassDTO[]>{
    return this.searchAllOborudKlassService.searchAll();
  }

  searchPage(oborudKlassSearchDTO: OborudKlassSearchDTO){
    return this.searchPageOborudKlassService.searchPage(oborudKlassSearchDTO);
  }

  createList(oborudKlassDTO: OborudKlassDTO[]): Observable<boolean>{
    return this.crudOborudKlassService.createList(oborudKlassDTO);
  }

  updateList(oborudKlassDTO: OborudKlassDTO[]): Observable<boolean>{
    return this.crudOborudKlassService.updateList(oborudKlassDTO);
  }
}
