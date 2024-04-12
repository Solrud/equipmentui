import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DialogResult, FIELD_COLUMN_GRUPPA_LIST, OriginSourceTable, TableType} from "../../../../../app.constant";
import {GruppaDTO} from "../../../../data/model/dto/impl/GruppaDTO";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {GruppaSearchDTO} from "../../../../data/model/search/impl/GruppaSearchDTO";
import {ToastService} from 'src/app/business/data/service/OptionalService/toast.service';
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {ModelService} from 'src/app/business/data/service/implements/model.service';

@Component({
  selector: 'app-gruppa-relationship-dialog',
  templateUrl: './gruppa-relationship-dialog.component.html',
  styleUrls: ['./gruppa-relationship-dialog.component.css']
})
export class GruppaRelationshipDialogComponent implements OnInit{
  selectedSourceSpravochnik: TableType;
  selectedElement: GruppaDTO;
  joinedGruppaList: GruppaDTO[];

  gruppaSearch: GruppaSearchDTO;
  gruppaFieldColumnList: string[] = FIELD_COLUMN_GRUPPA_LIST;
  gruppaDataInput: GruppaDTO[] = [];
  gruppaTotalElements: number;

  gruppaForJoinedMap: Map<GruppaDTO, boolean>;

  constructor(private activeModal: NgbActiveModal,
              private komplService: KomplService,
              private modelService: ModelService,
              private gruppaService: GruppaService,
              private toastService: ToastService) {
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
  }

  initDialogDefaultValues(){
    if (this.selectedSourceSpravochnik == TableType.KOMPL){

    }


    if(!this.gruppaSearch) this.gruppaSearch = new GruppaSearchDTO();
    this.toSearchPageGruppa();
  }

  toSearchPageGruppa(searchObj: GruppaSearchDTO = this.gruppaSearch){
    this.gruppaDataInput = [];
    this.gruppaService.searchPage(searchObj).subscribe( result => {
      console.log(result);
      if (result && result.content.length > 0){
        this.gruppaTotalElements = result.totalElements;
        this.gruppaDataInput = result.content;

        let tempMap = new Map<GruppaDTO, boolean>();
        // this.gruppaForJoinedMap = new Map<GruppaDTO, boolean>();
        for(let i = 0; i < this.gruppaDataInput.length; i++){
            if (this.gruppaDataInput[i]?.id == this.joinedGruppaList[i]?.id){
              tempMap.set(this.gruppaDataInput[i], true);
            } else{
              tempMap.set(this.gruppaDataInput[i], false);
            }
        }
        this.gruppaForJoinedMap = tempMap;
        console.log(this.gruppaForJoinedMap);
      }
    }, error => {
      this.toastService.showNegativeFixed('Не удалось загрузить таблицу Группа');
    })
  }

  onClickSave(): void{
    this.activeModal.close(DialogResult.ACCEPT);
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
