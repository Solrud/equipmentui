import {Component, OnInit} from '@angular/core';
import {
  DialogResult,
  FIELD_COLUMN_GRUPPA_LIST,
  FIELD_COLUMN_MODEL_LIST,
  OriginSourceTable,
  TableType
} from "../../../../../app.constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {ModelService} from "../../../../data/service/implements/model.service";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {ToastService} from "../../../../data/service/OptionalService/toast.service";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {ModelSearchDTO} from "../../../../data/model/search/impl/ModelSearchDTO";
import {ModelDTO} from "../../../../data/model/dto/impl/ModelDTO";
import {ABaseSearchDTO} from "../../../../data/model/search/ABaseSearchDTO";
import {KomplDTO} from "../../../../data/model/dto/impl/KomplDTO";
import {GruppaDTO} from "../../../../data/model/dto/impl/GruppaDTO";

@Component({
  selector: 'app-model-relationship-dialog',
  templateUrl: './model-relationship-dialog.component.html',
  styleUrls: ['./model-relationship-dialog.component.css']
})
export class ModelRelationshipDialogComponent implements OnInit{
  selectedSourceSpravochnik: TableType;
  selectedElement: any;
  joinedModelList: ModelDTO[];

  modelSearch: ModelSearchDTO;
  modelJoinedFieldColumnList: string[];
  modelPreSelectedFieldColumnList: string[] = FIELD_COLUMN_MODEL_LIST;
  modelDataInput: ModelDTO[] = [];
  modelTotalElements: number;

  modelForJoinedMap: Map<ModelDTO, boolean>;

  chosenModelFromSettings: ModelDTO;

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
    this.initDefaultValues();
    this.toSearchPageModel();
    this._subscribeToChosenForRemovePreRelatedElement();
  }


  initDefaultValues(): void{
    this.modelJoinedFieldColumnList = FIELD_COLUMN_MODEL_LIST.slice();
    this.modelJoinedFieldColumnList.push('X');

    if(!this.modelSearch) this.modelSearch = new ModelSearchDTO();
  }

  _subscribeToChosenForRemovePreRelatedElement(){
    this.eventService.selectedPreRelatedElement$.subscribe( (result: ModelDTO) => {
      // console.log(result);
      this.joinedModelList = this.joinedModelList.filter( (obj) =>  obj.id != result.id)

      this.modelForJoinedMap.forEach((value, key) => {
        if (key.id == result.id){
          this.modelForJoinedMap.set(key, false);
        }
      })
    })
  }

  toSearchPageModel(searchObj: ModelSearchDTO = this.modelSearch){
    this.modelDataInput = [];
    this.modelService.searchPage(searchObj).subscribe( result => {
      console.log(result);
      if (result && result?.content?.length > 0){
        this.modelTotalElements = result.totalElements;
        this.modelDataInput = result.content;

        let tempMap = new Map<ModelDTO, boolean>();
        for(let i = 0; i < this.modelDataInput.length; i++){
          let isJoined = false;
          tempMap.set(this.modelDataInput[i], false);
          for(let j = 0; j < this.joinedModelList.length; j++){
            if(this.modelDataInput[i]?.id == this.joinedModelList[j]?.id){
              isJoined = true;
            }
          }
          if(isJoined) tempMap.set(this.modelDataInput[i], true);
        }
        this.modelForJoinedMap = tempMap;
      }
    }, error => {
      this.toastService.showNegativeFixed('Не удалось загрузить таблицу Модель');
    })
  }


  toChooseElementFromSettings(newModel: {key, value}){
    this.modelForJoinedMap.set(newModel.key, !newModel.value);

    this.toReiterateEntriesFromMapToJoined(newModel);
  }

  toReiterateEntriesFromMapToJoined(newModel: {key, value}){
    if(!newModel.value)
      this.joinedModelList.push(newModel.key);
    if(newModel.value){
      this.joinedModelList = this.joinedModelList.filter( objJoined => objJoined?.id != newModel.key?.id);
    }
  }


  onChangePage(newDataSearch: ABaseSearchDTO): void{ //output изменения пагинации таблицы
    Object.keys(newDataSearch).forEach(key => {
      if (this.modelSearch.hasOwnProperty(key)) {
        this.modelSearch[key] = newDataSearch[key];
      }
    })
    this.toSearchPageModel();
  }

  onClickSave(): void{
    if (this.selectedSourceSpravochnik == TableType.KOMPL){
      this.newObj = new KomplDTO();
      this.newObj.id = this.selectedElement.id;
      this.newObj.akt = this.selectedElement.akt;
      this.newObj.kod = this.selectedElement.kod;
      this.newObj.naim = this.selectedElement.naim;
      this.newObj.tip = this.selectedElement.tip;
      if (this.selectedElement?.oborudovanie){
        this.selectedElement.oborudovanie.forEach( oborud => {
          if (oborud.tip != '1'){
            this.newObj.oborudovanie.push(oborud);
          }
        })
      }
      this.newObj.oborudovanie.push(...this.joinedModelList);

      this.komplService.update(this.newObj).subscribe( result => {
        if (result){
          this.toastService.showPositive('Изменены связи в "' + this.selectedSourceSpravochnik + '" с Моделью')
          this.activeModal.close(DialogResult.ACCEPT);
        }
      }, error => {
          this.toastService.showNegative('Не удалось изменить связи в "' + this.selectedSourceSpravochnik + '" с Моделью')
      })
    }
    if (this.selectedSourceSpravochnik == TableType.GRUPPA){
      this.newObj = new GruppaDTO();
      this.newObj.id = this.selectedElement.id;
      this.newObj.kod = this.selectedElement.kod;
      this.newObj.naim = this.selectedElement.naim;
      this.newObj.akt = this.selectedElement.akt;
      this.newObj.tip = this.selectedElement.tip;
      this.newObj.kodKlass = this.selectedElement.kodKlass;
      this.newObj.klass = this.selectedElement.klass;
      this.newObj.vid = this.selectedElement.vid;
      this.newObj.nalPu = this.selectedElement.nalPu;
      this.newObj.gabZo = this.selectedElement.gabZo;
      this.newObj.rod = this.selectedElement.rod;
      this.newObj.modely = this.joinedModelList;

      this.gruppaService.update(this.newObj).subscribe( result => {
        if (result){
          this.toastService.showPositive('Изменены связи в "' + this.selectedSourceSpravochnik + '" с Моделью')
          this.activeModal.close(DialogResult.ACCEPT);
        }
      }, error => {
        this.toastService.showNegative('Не удалось изменить связи в "' + this.selectedSourceSpravochnik + '" с Моделью')
      })
    }
    // console.log(this.newObj);
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
