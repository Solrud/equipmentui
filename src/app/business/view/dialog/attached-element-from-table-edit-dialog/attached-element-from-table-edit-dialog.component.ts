import {Component, OnInit} from '@angular/core';
import {
  DialogMode,
  DialogResult,
  FIELD_COLUMN_MODEL_LIST,
  OriginSourceTable,
  TableType
} from "../../../../app.constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {KomplService} from "../../../data/service/implements/kompl.service";
import {ModelService} from "../../../data/service/implements/model.service";
import {GruppaService} from "../../../data/service/implements/gruppa.service";
import {ToastService} from "../../../data/service/OptionalService/toast.service";
import {EventService} from "../../../data/service/OptionalService/event.service";
import {ModelDTO} from "../../../data/model/dto/impl/ModelDTO";
import {ModelSearchDTO} from "../../../data/model/search/impl/ModelSearchDTO";
import {ABaseSearchDTO} from "../../../data/model/search/ABaseSearchDTO";

@Component({
  selector: 'app-attached-element-from-table-edit-dialog',
  templateUrl: './attached-element-from-table-edit-dialog.component.html',
  styleUrls: ['./attached-element-from-table-edit-dialog.component.css']
})
export class AttachedElementFromTableEditDialogComponent implements OnInit{
  selectedElement: ModelDTO //приходит из компонента
  dialogMode: DialogMode;
  modelSearch: ModelSearchDTO;
  modelTotalFoundedElements: number;
  modelDataInputList: ModelDTO[];
  modelFieldColumnsList: string[] = FIELD_COLUMN_MODEL_LIST;

  newSelectedModel: ModelDTO;

  isNewSelectedModel: boolean = false;

  constructor(private activeModal: NgbActiveModal,
              private komplService: KomplService,
              private modelService: ModelService,
              private gruppaService: GruppaService,
              private toastService: ToastService,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    this.initDefaultValues();
    this.toSearchModel();
  }
  public get TableType(){
    return TableType
  }

  public get OriginSourceTable(){
    return OriginSourceTable
  }

  initDefaultValues(){
    if (!this.modelSearch) this.modelSearch = new ModelSearchDTO();
    if (!this.newSelectedModel) this.newSelectedModel = this.selectedElement;
  }

  toSearchModel(modelSearch: ModelSearchDTO = this.modelSearch){
    this.modelService.searchPage(modelSearch).subscribe( result => {
      if (result && result?.content?.length > 0){
        this.modelTotalFoundedElements = result.totalElements;
        if(this.selectedElement)
          this.modelTotalFoundedElements ++;
        this.modelDataInputList = result.content.filter( model => model.id != this.selectedElement?.id);
        if (result.number == 0 && this.selectedElement){
          this.modelDataInputList.unshift(this.selectedElement);
        }
      }
    }, error => {
      this.toastService.showNegative('Не удалось загрузить таблицу моделей');
    })
  }

  onChangePage(newDataSearch: ABaseSearchDTO): void{ //output изменения пагинации таблицы
    Object.keys(newDataSearch).forEach(key => {
      if (this.modelSearch.hasOwnProperty(key)) {
        this.modelSearch[key] = newDataSearch[key];
      }
    })
    this.toSearchModel();
  }

  toChooseElementFromSettings(newModel: ModelDTO){
    this.isNewSelectedModel = this.selectedElement?.id != newModel?.id;
    this.newSelectedModel = newModel;
  }

  onSaveChosenElement(){
    this.activeModal.close([DialogResult.ACCEPT, this.newSelectedModel]);
  }

  onClickCloseModal(): void{
    this.activeModal.close([DialogResult.CANCEL]);
  }
}
