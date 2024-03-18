import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {INIT_NAV_BAR, TableData, TableType} from "../../../../app.constant";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  selectedElementTable$ = new Subject();
  selectElementTable$(selectedElement: any){
    this.selectedElementTable$.next(selectedElement);
  }

  selectedSpravTable$ = new BehaviorSubject(INIT_NAV_BAR);
  selectSpravTab$(navTab: TableType){
    this.selectedSpravTable$.next(navTab);
  }

  tableDataSource$ = new BehaviorSubject(new TableData());
  pushTableDataSource$(columnList: string[], dataTableList: object[]){
    this.tableDataSource$.next(new TableData(columnList, dataTableList))
  }

  spinnerVisibility = new BehaviorSubject(false);
  showSpinner$(): void {
    // console.log('спиннер есть');
    this.spinnerVisibility.next(true);
  }
  hideSpinner$(): void {
    // console.log('спиннера нету');
    this.spinnerVisibility.next(false);
  }
}
