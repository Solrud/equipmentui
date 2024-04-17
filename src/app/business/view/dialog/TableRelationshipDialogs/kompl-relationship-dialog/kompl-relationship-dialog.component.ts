import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {ModelService} from "../../../../data/service/implements/model.service";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {ToastService} from "../../../../data/service/OptionalService/toast.service";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {DialogResult, FIELD_COLUMN_KOMPL_LIST, OriginSourceTable, TableType} from "../../../../../app.constant";
import {ABaseSearchDTO} from "../../../../data/model/search/ABaseSearchDTO";
import {KomplDTO} from "../../../../data/model/dto/impl/KomplDTO";
import {KomplSearchDTO} from "../../../../data/model/search/impl/KomplSearchDTO";

@Component({
  selector: 'app-kompl-relationship-dialog',
  templateUrl: './kompl-relationship-dialog.component.html',
  styleUrls: ['./kompl-relationship-dialog.component.css']
})
export class KomplRelationshipDialogComponent implements OnInit{
  selectedSourceSpravochnik: TableType;
  selectedElement: any;
  joinedKomplList: KomplDTO[];

  komplSearch: KomplSearchDTO;
  komplJoinedFieldColumnList: string[];
  komplPreSelectedFieldColumnList: string[] = FIELD_COLUMN_KOMPL_LIST;
  komplDataInput: KomplDTO[] = [];
  komplTotalElements: number;

  komplForJoinedMap: Map<KomplDTO, boolean>;

  chosenKomplFromSettings: KomplDTO;

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
    this.initDialogDefaultValues();
    this.toSearchKompl();
    this._subscribeToChosenForRemovePreRelatedElement();
  }

  initDialogDefaultValues(){
    if (this.selectedSourceSpravochnik == TableType.KOMPL){}

    this.komplJoinedFieldColumnList = FIELD_COLUMN_KOMPL_LIST.slice();
    this.komplJoinedFieldColumnList.push('X');

    if(!this.komplSearch) this.komplSearch = new KomplSearchDTO();
  }


  _subscribeToChosenForRemovePreRelatedElement(){
    this.eventService.selectedPreRelatedElement$.subscribe( (result: KomplDTO) => {
      this.joinedKomplList = this.joinedKomplList.filter( (obj) =>  obj.id != result.id)


      this.komplForJoinedMap.forEach((value, key) => {
        if (key.id == result.id){
          this.komplForJoinedMap.set(key, false);
        }
      })
    })
  }

  toSearchKompl(searchObj: KomplSearchDTO = this.komplSearch){
    this.komplDataInput = [];
    this.komplService.searchPage(searchObj).subscribe( result => {
      // console.log(result);
      if (result && result.content.length > 0){
        this.komplTotalElements = result.totalElements;
        this.komplDataInput = result.content;

        let tempMap = new Map<KomplDTO, boolean>();
        for(let i = 0; i < this.komplDataInput.length; i++){
          let isJoined = false;
          tempMap.set(this.komplDataInput[i], false);
          for(let j = 0; j < this.joinedKomplList.length; j++){
            if(this.komplDataInput[i]?.id == this.joinedKomplList[j]?.id){
              isJoined = true;
            }
          }
          if(isJoined) tempMap.set(this.komplDataInput[i], true);
        }
        this.komplForJoinedMap = tempMap;
      }
    }, error => {
      this.toastService.showNegativeFixed('Не удалось загрузить таблицу Группа');
    })
  }

  toChooseElementFromSettings(newGruppa: {key, value}){
    this.komplForJoinedMap.set(newGruppa.key, !newGruppa.value);

    this.toReiterateEntriesFromMapToJoined(newGruppa);
  }

  toReiterateEntriesFromMapToJoined(newGruppa: {key, value}){
    if(!newGruppa.value)
      this.joinedKomplList.push(newGruppa.key);
    if(newGruppa.value){
      this.joinedKomplList = this.joinedKomplList.filter( objJoined => objJoined?.id != newGruppa.key?.id);
    }
  }

  onChangePage(newDataSearch: ABaseSearchDTO): void{ //output изменения пагинации таблицы
    Object.keys(newDataSearch).forEach(key => {
      if (this.komplSearch.hasOwnProperty(key)) {
        this.komplSearch[key] = newDataSearch[key];
      }
    })
    this.toSearchKompl();
  }

  onClickSave(): void{
    if (this.selectedSourceSpravochnik === TableType.GRUPPA){
      this.gruppaService.setKompleksyById(this.selectedElement.id.toString(), this.joinedKomplList).subscribe( result => {
        if (result){
          this.toastService.showPositive('Изменены связи в "' + this.selectedSourceSpravochnik + '" с Комплексом')
          this.activeModal.close(DialogResult.ACCEPT);
        }
      }, error => {
        this.toastService.showNegative('Не удалось изменить связи в "' + this.selectedSourceSpravochnik + '" с Комплексом')
      })
    }
    if (this.selectedSourceSpravochnik === TableType.MODEL){
      // console.l
      this.modelService.setKompleksyById(this.selectedElement.id.toString(), this.joinedKomplList).subscribe( result => {
        if (result){
          this.toastService.showPositive('Изменены связи в "' + this.selectedSourceSpravochnik + '" с Комплексом')
          this.activeModal.close(DialogResult.ACCEPT);
        }
      }, error => {
        this.toastService.showNegative('Не удалось изменить связи в "' + this.selectedSourceSpravochnik + '" с Комплексом')
      })
    }

  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
