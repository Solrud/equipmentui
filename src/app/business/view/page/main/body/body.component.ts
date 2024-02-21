import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {TableType} from "../../../../../app.constant";
import {EventType} from "@angular/router";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";
import {concatMap, debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  showFiller = false;
  tableType = Object.keys(TableType);
  tabTyp = TableType;
  tabMatIndex = 0;

  selectedSpavochnik: string;

  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  constructor(private oborudEkzService: OborudEkzService) {
  }

  ngOnInit(): void {
    // EventService.selectedSpravTable.subscribe(result => {
    //   const valuesEnum = Object.values(TableType);
    //   if(valuesEnum.includes(result)){
    //     this.tabMatIndex =  valuesEnum.indexOf(result);
    //     console.log('есть номер ', result, 'номер у него ->', valuesEnum.indexOf(result))
    //
    //     this.test();
    //   } else {
    //     console.log('нет', result)
    //   }
    // })
  }

  //
  // get tableType{
  //   return TableType;
  // }

  toggleSidenavOpened(){
    this.drawerComponent?.toggle();
  }

  test() {
    this.oborudEkzService.searchAll().subscribe(res => {
      console.log(res)
    })
  }

  onClickChooseTable(type: string){
    console.log('СРАБОТАЛ КЛИК', type)
    // EventService.selectedSpravTable.next(TableType[type]);

    this.selectedSpavochnik = type;
  }
}
