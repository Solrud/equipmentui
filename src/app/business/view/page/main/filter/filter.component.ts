import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  DELAY_TIME_FOR_FILTER,
  FIELD_COLUMN_GRUPPA_LIST,
  FIELD_COLUMN_KOMPL_LIST,
  FIELD_COLUMN_MODEL_LIST,
  FIELD_COLUMN_OBORUD_EKZ_LIST,
  TableType
} from "../../../../../app.constant";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {FormControl, FormGroup} from "@angular/forms";
import {KomplSearchDTO} from "../../../../data/model/search/impl/KomplSearchDTO";
import {OborudEkzSearchDTO} from "../../../../data/model/search/impl/OborudEkzSearchDTO";
import {ModelSearchDTO} from "../../../../data/model/search/impl/ModelSearchDTO";
import {GruppaSearchDTO} from "../../../../data/model/search/impl/GruppaSearchDTO";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnChanges{
  komplFieldColumnList = FIELD_COLUMN_KOMPL_LIST.slice(1);
  gruppaFieldColumnList = FIELD_COLUMN_GRUPPA_LIST.slice(1);
  modelFieldColumnList = FIELD_COLUMN_MODEL_LIST.slice(1);
  oborudEkzFieldColumnList = FIELD_COLUMN_OBORUD_EKZ_LIST.slice(1);

  @Input()
  selectedSpravochnik: TableType;
  @Input()
  searchKompl: KomplSearchDTO;
  @Input()
  searchGruppa: GruppaSearchDTO;
  @Input()
  searchModel: ModelSearchDTO;
  @Input()
  searchOborudEkz: OborudEkzSearchDTO;
  @Input()
  isCollapsed: boolean = true;

  @Output()
  newSearch: EventEmitter<any> = new EventEmitter<any>();

  fgKomplFilter: FormGroup;
  fgGruppaFilter: FormGroup;
  fgModelFilter: FormGroup;
  fgOborudEkzFilter: FormGroup;

  komplIsExpanded: boolean = false;
  gruppaIsExpanded: boolean = false;
  modelIsExpanded: boolean = false;
  oborudEkzIsExpanded: boolean = false;

  currentSearch: any;
  currentIsExpanded: boolean;
  currentFg: FormGroup;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    // this._subscribeToSelectedSpravochnik();


  }

  public get TableType(){
    return TableType;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedSpravochnik']){
      this.initFgAll();
      console.log('selectedSprav in filter')
      this.selectedSpravochnik = changes['selectedSpravochnik'].currentValue;
      this.toDefineCurrentValues(this.selectedSpravochnik);
      this._observeFgKompl();
      this._observeFgGruppa();
      this._observeFgModel();
      this._observeFgOborudEkz();
    }
  }

  toDefineCurrentValues(tableType: TableType){
    if (tableType === TableType.KOMPL){
      this.currentSearch = this.searchKompl;
      this.currentIsExpanded = this.komplIsExpanded;
      this.currentFg = this.fgKomplFilter;
    }
    if (tableType === TableType.GRUPPA){
      this.currentSearch = this.searchGruppa;
      this.currentIsExpanded = this.gruppaIsExpanded;
      this.currentFg = this.fgGruppaFilter;
    }
    if (tableType === TableType.MODEL){
      this.currentSearch = this.searchModel;
      this.currentIsExpanded = this.modelIsExpanded;
      this.currentFg = this.fgModelFilter;
    }
    if (tableType === TableType.OBORUD_EKZ){
      this.currentSearch = this.searchOborudEkz;
      this.currentIsExpanded = this.oborudEkzIsExpanded;
      this.currentFg = this.fgOborudEkzFilter;
    }
  }

  getCorrectValueFromField(field: string){
    if (this.selectedSpravochnik === TableType.KOMPL){
      if (this.searchKompl) return this.searchKompl[field];
    }
    if (this.selectedSpravochnik === TableType.GRUPPA){
      if (this.searchGruppa) return this.searchGruppa[field];
    }
    if (this.selectedSpravochnik === TableType.MODEL){
      if (this.searchModel) return this.searchModel[field];
    }
    if (this.selectedSpravochnik === TableType.OBORUD_EKZ){
      if (this.searchOborudEkz) return this.searchOborudEkz[field];
    }
    return null;
  }

  initFgAll(){
    this.fgKomplFilter = new FormGroup({
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: false}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: false})
    })

    this.fgGruppaFilter = new FormGroup({
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: false}),
      kodKlass: new FormControl({value: this.getCorrectValueFromField('kodKlass'), disabled: false}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: false})
    })
    this.fgModelFilter = new FormGroup({
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: false}),
      obozn: new FormControl({value: this.getCorrectValueFromField('obozn'), disabled: false}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: false})
    })
    this.fgOborudEkzFilter = new FormGroup({
      serNom: new FormControl({value: this.getCorrectValueFromField('serNom'), disabled: false}),
      invNom: new FormControl({value: this.getCorrectValueFromField('invNom'), disabled: false}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false})
    })
  }

  _observeFgKompl(){
    this.fgKomplFilter.controls['kod'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchKompl.kod = inputValue;
      this.newSearch.emit(this.searchKompl);
    })
    this.fgKomplFilter.controls['naim'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchKompl.naim = inputValue;
      this.newSearch.emit(this.searchKompl);
    })
  }
  _observeFgGruppa(){
    this.fgGruppaFilter.controls['kod'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchGruppa.kod = inputValue;
      this.newSearch.emit(this.searchGruppa);
    })
    this.fgGruppaFilter.controls['kodKlass'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchGruppa.kodKlass = inputValue;
      this.newSearch.emit(this.searchGruppa);
    })
    this.fgGruppaFilter.controls['naim'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchGruppa.naim = inputValue;
      console.log('gruppa naim emit', inputValue)
      this.newSearch.emit(this.searchGruppa);
    })
  }
  _observeFgModel(){
    this.fgModelFilter.controls['kod'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchModel.kod = inputValue;
      this.newSearch.emit(this.searchModel);
    })
    this.fgModelFilter.controls['obozn'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchModel.obozn = inputValue;
      this.newSearch.emit(this.searchModel);
    })
    this.fgModelFilter.controls['naim'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchModel.naim = inputValue;
      this.newSearch.emit(this.searchModel);
    })
  }
  _observeFgOborudEkz(){
    this.fgOborudEkzFilter.controls['serNom'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchOborudEkz.serNom = inputValue;
      this.newSearch.emit(this.searchOborudEkz);
    })
    this.fgOborudEkzFilter.controls['invNom'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchOborudEkz.invNom = inputValue;
      this.newSearch.emit(this.searchOborudEkz);
    })
    this.fgOborudEkzFilter.controls['naim'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchOborudEkz.naim = inputValue;
      this.newSearch.emit(this.searchOborudEkz);
    })
  }

  onClickChangeAct(){
    if (this.currentSearch.akt != null){
      if (this.currentSearch.akt == 0)
        this.currentSearch.akt = null;
      if (this.currentSearch.akt == 1)
        this.currentSearch.akt = 0;
    } else {
      this.currentSearch.akt = 1;
    }
    this.newSearch.emit(this.currentSearch);
    //ToDo стоит ли debounceTime?
  }

  onClickClearAll(){
    let tableType = this.selectedSpravochnik;
    if (tableType === TableType.KOMPL){
      this.fgKomplFilter.controls['kod'].setValue(null);
      this.fgKomplFilter.controls['naim'].setValue(null);
      this.fgKomplFilter.controls['akt'].setValue(null);
      this.searchKompl = new KomplSearchDTO();
      this.searchKompl.kod = null;
      this.searchKompl.naim = null;
      this.searchKompl.akt = null;
      this.currentSearch = this.searchKompl;
      // this.newSearch.emit(this.searchKompl);
    }
    if (tableType === TableType.GRUPPA){
      this.fgGruppaFilter.controls['kod'].setValue(null);
      this.fgGruppaFilter.controls['kodKlass'].setValue(null);
      this.fgGruppaFilter.controls['naim'].setValue(null);
      this.fgGruppaFilter.controls['akt'].setValue(null);
      this.searchGruppa = new GruppaSearchDTO();
      this.searchGruppa.kod = null;
      this.searchGruppa.kodKlass = null;
      this.searchGruppa.naim = null;
      this.searchGruppa.akt = null;
      this.currentSearch = this.searchGruppa;
      // this.newSearch.emit(this.searchGruppa);
    }
    if (tableType === TableType.MODEL){
      this.fgModelFilter.controls['kod'].setValue(null);
      this.fgModelFilter.controls['obozn'].setValue(null);
      this.fgModelFilter.controls['naim'].setValue(null);
      this.fgModelFilter.controls['akt'].setValue(null);
      this.searchModel = new ModelSearchDTO();
      this.searchModel.kod = null;
      this.searchModel.obozn = null;
      this.searchModel.naim = null;
      this.searchModel.akt = null;
      this.currentSearch = this.searchModel;
      // this.newSearch.emit(this.searchModel);
    }
    if (tableType === TableType.OBORUD_EKZ){
      this.fgOborudEkzFilter.controls['serNom'].setValue(null);
      this.fgOborudEkzFilter.controls['invNom'].setValue(null);
      this.fgOborudEkzFilter.controls['naim'].setValue(null);
      this.searchOborudEkz = new OborudEkzSearchDTO();
      this.searchOborudEkz.serNom = null;
      this.searchOborudEkz.invNom = null;
      this.searchOborudEkz.akt = null;
      this.currentSearch = this.searchOborudEkz;
      // this.newSearch.emit(this.searchOborudEkz);
    }
    this.newSearch.emit(this.currentSearch);
  }

  isFilterNotEmpty(): boolean{
    let checkResult = false;
    Object.keys(this.currentFg.controls).forEach(key => {
      if (this.currentFg.controls[key].value) checkResult = true;
    });
    return checkResult;
  }

}
