import { Component, OnInit } from '@angular/core';
import {DialogResult, FIELD_COLUMN_OBORUD_KLASS_LIST, OriginSourceTable, TableType} from "../../../../app.constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OborudKlassSearchDTO} from "../../../data/model/search/impl/OborudKlassSearchDTO";
import {OborudKlassService} from "../../../data/service/implements/oborud-klass.service";
import {OborudKlassDTO} from "../../../data/model/dto/impl/OborudKlassDTO";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit{

  // Класс(Код) Оборудования
  klassSearch: OborudKlassSearchDTO = new OborudKlassSearchDTO();
  klassDataTableInput: OborudKlassDTO[] = [];
  klassTotalFoundedElements: number = 0;
  klassFieldColumnList: string[] = FIELD_COLUMN_OBORUD_KLASS_LIST;


  constructor(private activeModal: NgbActiveModal,
              private klassService: OborudKlassService) {
  }

  ngOnInit(): void {
    this.onClickSearchKlassOborud(this.klassSearch);
  }

  public get OriginSourceTable(){
    return OriginSourceTable;
  }

  public get TableType(){
    return TableType;
  }

  onClickSearchKlassOborud(klassSearch: OborudKlassSearchDTO): void{
    if (klassSearch){
      this.klassSearch = klassSearch;
      this.klassDataTableInput = [];
      this.klassService.searchPage(this.klassSearch).subscribe( result => {
        console.log(result);
        this.klassDataTableInput = result.content;
        this.klassTotalFoundedElements = result.totalElements;
      }, error => {
        console.log('Произошла какая-то ошибка onClickSearchKlassOborud() в settings.');
      })
    }
  }




  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
