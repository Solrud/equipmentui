import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DialogResult, FIELD_COLUMN_GRUPPA_LIST, OriginSourceTable, TableType} from "../../../../../app.constant";
import {GruppaDTO} from "../../../../data/model/dto/impl/GruppaDTO";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {GruppaSearchDTO} from "../../../../data/model/search/impl/GruppaSearchDTO";
import {ToastService} from 'src/app/business/data/service/OptionalService/toast.service';
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {ModelService} from 'src/app/business/data/service/implements/model.service';
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {KomplDTO} from "../../../../data/model/dto/impl/KomplDTO";
import {ABaseSearchDTO} from "../../../../data/model/search/ABaseSearchDTO";

@Component({
  selector: 'app-gruppa-relationship-dialog',
  templateUrl: './gruppa-relationship-dialog.component.html',
  styleUrls: ['./gruppa-relationship-dialog.component.css']
})
export class GruppaRelationshipDialogComponent implements OnInit{
  selectedSourceSpravochnik: TableType;
  selectedElement: any;
  joinedGruppaList: GruppaDTO[];

  gruppaSearch: GruppaSearchDTO;
  gruppaJoinedFieldColumnList: string[];
  gruppaPreSelectedFieldColumnList: string[] = FIELD_COLUMN_GRUPPA_LIST;
  gruppaDataInput: GruppaDTO[] = [];
  gruppaTotalElements: number;

  gruppaForJoinedMap: Map<GruppaDTO, boolean>;

  chosenGruppaFromSettings: GruppaDTO;

  newObj: any;

  constructor(private activeModal: NgbActiveModal,
              private komplService: KomplService,
              private modelService: ModelService,
              private gruppaService: GruppaService,
              private toastService: ToastService,
              private eventService: EventService) {
  }

  public get TableType(){
    return TableType;
  }

  public get OriginSourceTable(){
    return OriginSourceTable
  }

  ngOnInit(): void {
    console.log(this.selectedSourceSpravochnik)
    console.log(this.selectedElement)
    console.log(this.joinedGruppaList)
    this.initDialogDefaultValues();
    this._subscribeToChosenForRemovePreRelatedElement();
  }

  initDialogDefaultValues(){
    if (this.selectedSourceSpravochnik == TableType.KOMPL){}

    this.gruppaJoinedFieldColumnList = FIELD_COLUMN_GRUPPA_LIST.slice();
    this.gruppaJoinedFieldColumnList.push('X');

    if(!this.gruppaSearch) this.gruppaSearch = new GruppaSearchDTO();

    this.toSearchPageGruppa();
  }

  _subscribeToChosenForRemovePreRelatedElement(){
    this.eventService.selectedPreRelatedElement$.subscribe( (result: GruppaDTO) => {
      // console.log(result);

      // let newJoinedGruppaList = [];
      // this.joinedGruppaList.forEach( gruppa => {
      //   if (gruppa.id != result.id) newJoinedGruppaList.push(gruppa);
      // })
      // this.joinedGruppaList = newJoinedGruppaList;
      this.joinedGruppaList = this.joinedGruppaList.filter( (obj) =>  obj.id != result.id)


      this.gruppaForJoinedMap.forEach((value, key) => {
        if (key.id == result.id){
          this.gruppaForJoinedMap.set(key, false);
        }
      })
    })
  }

  toSearchPageGruppa(searchObj: GruppaSearchDTO = this.gruppaSearch){
    this.gruppaDataInput = [];
    this.gruppaService.searchPage(searchObj).subscribe( result => {
      console.log(result);
      if (result && result.content.length > 0){
        this.gruppaTotalElements = result.totalElements;
        this.gruppaDataInput = result.content;

        let tempMap = new Map<GruppaDTO, boolean>();
        for(let i = 0; i < this.gruppaDataInput.length; i++){
          let isJoined = false;
          tempMap.set(this.gruppaDataInput[i], false);
          for(let j = 0; j < this.joinedGruppaList.length; j++){
            if(this.gruppaDataInput[i]?.id == this.joinedGruppaList[j]?.id){
              isJoined = true;
            }
          }
          if(isJoined) tempMap.set(this.gruppaDataInput[i], true);
        }
        this.gruppaForJoinedMap = tempMap;
      }
    }, error => {
      this.toastService.showNegativeFixed('Не удалось загрузить таблицу Группа');
    })
  }

  toChooseElementFromSettings(newGruppa: {key, value}){
    this.gruppaForJoinedMap.set(newGruppa.key, !newGruppa.value);

    this.toReiterateEntriesFromMapToJoined(newGruppa);
  }

  toReiterateEntriesFromMapToJoined(newGruppa: {key, value}){
    if(!newGruppa.value)
      this.joinedGruppaList.push(newGruppa.key);
    if(newGruppa.value){
      this.joinedGruppaList = this.joinedGruppaList.filter( objJoined => objJoined?.id != newGruppa.key?.id);
    }
  }

  onChangePage(newDataSearch: ABaseSearchDTO): void{ //output изменения пагинации таблицы
    Object.keys(newDataSearch).forEach(key => {
      if (this.gruppaSearch.hasOwnProperty(key)) {
        this.gruppaSearch[key] = newDataSearch[key];
      }
    })
    this.toSearchPageGruppa();
  }

  onClickSave(): void{
    if (this.selectedSourceSpravochnik === TableType.KOMPL){
      this.newObj = new KomplDTO();
      this.newObj.id = this.selectedElement.id;
      this.newObj.akt = this.selectedElement.akt;
      this.newObj.kod = this.selectedElement.kod;
      this.newObj.naim = this.selectedElement.naim;
      this.newObj.tip = this.selectedElement.tip;
      if (this.selectedElement?.oborudovanie){
        this.selectedElement.oborudovanie.forEach( oborud => {
          if (oborud.tip != '2'){
            this.newObj.oborudovanie.push(oborud);
          }
        })
      }
      this.newObj.oborudovanie.push(...this.joinedGruppaList);
      this.komplService.update(this.newObj).subscribe( result => {
        if (result)
          this.toastService.showPositive('Изменены связи в "' + this.selectedSourceSpravochnik + '" с Группой')
          this.activeModal.close(DialogResult.ACCEPT);
      }, error => {
        this.toastService.showNegative('Не удалось изменить связи в "' + this.selectedSourceSpravochnik + '" с Группой')
      });
    }
    console.log(this.newObj);
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
