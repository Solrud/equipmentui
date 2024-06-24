import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  DELAY_TIME_CLOSE_FOR_TOOLTIP,
  DELAY_TIME_FOR_FILTER,
  DELAY_TIME_OPEN_FOR_TOOLTIP,
  FIELD_COLUMN_GRUPPA_LIST,
  FIELD_COLUMN_KOMPL_LIST,
  FIELD_COLUMN_MODEL_LIST,
  FIELD_COLUMN_OBORUD_EKZ_LIST,
  TableType,
  UserRoleAuth
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
export class FilterComponent implements OnChanges, OnInit{
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

  aktMap: Map<string, boolean> = new Map<string, boolean>();

  currentRole: UserRoleAuth

  constructor(private eventService: EventService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedSpravochnik']){
      this.initFgAll();
      this.selectedSpravochnik = changes['selectedSpravochnik'].currentValue;
      this.toDefineCurrentValues(this.selectedSpravochnik);
      this._observeFgKompl();
      this._observeFgGruppa();
      this._observeFgModel();
      this._observeFgOborudEkz();

      this.toSetSelectAktMenuForRole();
    }
  }

  ngOnInit(): void {
    this._subscribeCurrentRole();
  }

  public get TableType(){
    return TableType;
  }
  public get DELAY_TIME_OPEN_FOR_TOOLTIP(){
    return DELAY_TIME_OPEN_FOR_TOOLTIP;
  }
  public get DELAY_TIME_CLOSE_FOR_TOOLTIP(){
    return DELAY_TIME_CLOSE_FOR_TOOLTIP;
  }

  _subscribeCurrentRole(){
    this.eventService.selectedCurrentRole$.subscribe( result => {
      this.currentRole = result;

      this.toSetSelectAktMenuForRole();
    })
  }

  toSetSelectAktMenuForRole(){
    if (this.currentRole != UserRoleAuth.VIEW){
      this.aktMap.set('Действующие', false);
      this.aktMap.set('Все', false);
      this.aktMap.set('Устаревшие', false);
      if (this.currentSearch.akt == null)
        this.aktMap.set('Все', true);
      if (this.currentSearch.akt == 1)
        this.aktMap.set('Действующие', true);
      if (this.currentSearch.akt == 0)
        this.aktMap.set('Устаревшие', true);
    }

    if(!this.currentRole || this.currentRole == UserRoleAuth.VIEW){
      this.aktMap.clear();
      this.aktMap.set('Действующие', true);
      this.changeAktSelect();
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
      if (this.searchKompl) {
        if (field == 'akt'){
          return this.searchKompl.akt != 1 ? 1 : null;
        } else {
          return this.searchKompl[field];
        }
      }
    }
    if (this.selectedSpravochnik === TableType.GRUPPA){
      if (this.searchGruppa) {
        if (field == 'akt'){
          return this.searchGruppa.akt != 1 ? 1 : null;
        } else {
          return this.searchGruppa[field];
        }
      }
    }
    if (this.selectedSpravochnik === TableType.MODEL){
      if (this.searchModel) {
        if (field == 'akt'){
          return this.searchModel.akt != 1 ? 1 : null;
        } else {
          return this.searchModel[field];
        }
      }
    }
    if (this.selectedSpravochnik === TableType.OBORUD_EKZ){
      if (this.searchOborudEkz) {
        if (field == 'akt') {
          return this.searchOborudEkz.akt != 1 ? 1 : null;
        } else {
          return this.searchOborudEkz[field];
        }
      }
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
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}),
      podrObozn: new FormControl({value: this.getCorrectValueFromField('podrObozn'), disabled: false}),
      uchObozn: new FormControl({value: this.getCorrectValueFromField('uchObozn'), disabled: false}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: false})
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
    this.fgOborudEkzFilter.controls['podrObozn'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      console.log(inputValue)
      this.searchOborudEkz.podrObozn = inputValue;
      this.newSearch.emit(this.searchOborudEkz);
    })
    this.fgOborudEkzFilter.controls['uchObozn'].valueChanges.pipe(debounceTime(DELAY_TIME_FOR_FILTER)).subscribe( inputValue => {
      this.searchOborudEkz.uchObozn = inputValue;
      this.newSearch.emit(this.searchOborudEkz);
    })
  }

  changeAktSelect(akt: any = 'Действующие'){
    if(akt == 'Все' || akt?.target?.value == 'Все')
      this.currentSearch.akt = null;

    if(akt == 'Действующие' || akt?.target?.value == 'Действующие')
      this.currentSearch.akt = 1;

    if(akt == 'Устаревшие' || akt?.target?.value == 'Устаревшие')
      this.currentSearch.akt = 0;

    this.currentFg.controls['akt'].setValue(this.currentSearch.akt != 1 ? 1 : null);
    this.newSearch.emit(this.currentSearch);
  }

  // // ------------------ old for button
  // onClickChangeAct(){
  //   if (this.currentSearch.akt != null){
  //     if (this.currentSearch.akt == 0)
  //       this.currentSearch.akt = null;
  //     if (this.currentSearch.akt == 1)
  //       this.currentSearch.akt = 0;
  //   } else {
  //     this.currentSearch.akt = 1;
  //   }
  //   this.newSearch.emit(this.currentSearch);
  //   //ToDo стоит ли debounceTime?
  // }

  onClickClearAll(){
    for(let key of this.aktMap.keys()){
      this.aktMap.set(key, false);
      if(key == 'Действующие')
        this.aktMap.set(key, true);
    }

    let tableType = this.selectedSpravochnik;
    if (tableType === TableType.KOMPL){
      this.fgKomplFilter.controls['kod'].setValue(null);
      this.fgKomplFilter.controls['naim'].setValue(null);
      this.fgKomplFilter.controls['akt'].setValue(null);
      this.searchKompl = new KomplSearchDTO();
      this.searchKompl.kod = null;
      this.searchKompl.naim = null;
      this.searchKompl.akt = 1;
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
      this.searchGruppa.akt = 1;
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
      this.searchModel.akt = 1;
      this.currentSearch = this.searchModel;
      // this.newSearch.emit(this.searchModel);
    }
    if (tableType === TableType.OBORUD_EKZ){
      this.fgOborudEkzFilter.controls['serNom'].setValue(null);
      this.fgOborudEkzFilter.controls['invNom'].setValue(null);
      this.fgOborudEkzFilter.controls['naim'].setValue(null);
      this.fgOborudEkzFilter.controls['podrObozn'].setValue(null);
      this.fgOborudEkzFilter.controls['uchObozn'].setValue(null);
      this.fgOborudEkzFilter.controls['akt'].setValue(null);
      this.searchOborudEkz = new OborudEkzSearchDTO();
      this.searchOborudEkz.serNom = null;
      this.searchOborudEkz.invNom = null;
      this.searchOborudEkz.naim = null;
      this.searchOborudEkz.podrObozn = null;
      this.searchOborudEkz.uchObozn = null;
      this.searchOborudEkz.akt = 1;
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

  // когда меняешь допустим в модели на устаревшее, переключаешься на экз, ставишь гостя и возвращаешься в модели, то там устаревшее
}
